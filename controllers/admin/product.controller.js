const Product = require("../../models/product.model");
const ProductCategory=require("../../models/productCategory.model");
const Account=require("../../models/account.model");
const systemConfig = require("../../config/system");
const paginationHelper = require("../../helpers/pagination.helper")
const createTreeHelper=require("../../helpers/createTree.helper");
const moment = require("moment");

module.exports.index = async (req, res) => {
    const find = {
        deleted: false
    };

    const filterStatus = [{
        label: "Tất cả",
        value: ""
    },
    {
        label: "Hoạt đoộng",
        value: "active"
    },
    {
        label: " Dừng hoạt động",
        value: "inactive"
    },
    ];
    if (req.query.status) {
        find.status = req.query.status;
    }
    //tim kiem
    let keyword = "";
    if (req.query.keyword) {
        const regex = new RegExp(req.query.keyword, 'i');
        find.title = regex;
        keyword = req.query.keyword;
    }
    //sap xep
    const sort={};
    if(req.query.sortKey &&req.query.sortValue){
        sort[req.query.sortKey]=req.query.sortValue;
    }
    else{
        sort.position="desc";
    }
    //page
    const pagination = await paginationHelper(req, find);
    const products = await Product.find(find)
        .limit(pagination.limiItems)
        .skip(pagination.skip)
        .sort(sort);
    for(const item of products){
        if(item.createdBy){
            const accountCreated=await Account.findOne({
                _id: item.createdBy
            });
            item.createdByFullName=accountCreated.fullName;
        }else{
            item.createdByFullName="";
        }
        item.createdAtFormat=moment(item.createdAt).format("DD/MM/YY HH:mm:ss" );

        if(item.updatedBy){
            const accountUpdated=await Account.findOne({
                _id: item.updatedBy
            });
            item.updatedByFullName=accountUpdated.fullName;
        }else{
            item.updatedByFullName="";
        }
        item.updatedAtFormat=moment(item.createdAt).format("DD/MM/YY HH:mm:ss" );

    }
    const { id, statusChange } = req.params;
    res.render("admin/pages/products/index", {
        pageTitle: "Quản lí  sản phẩm",
        products: products,
        keyword: keyword,
        filterStatus: filterStatus,
        pagination: pagination
    });
}

// Thay đổi trạng thái sản phẩm
module.exports.changeStatus = async (req, res) => {
    if(res.locals.role.permissions.includes("products-edit")){
        const { id, statusChange } = req.params;
        await Product.updateOne({
            _id: id
        }, {
            status: statusChange
        });
        req.flash('success', 'Cập nhật trạng thái thành công!');
        res.json({
            code: 200
        });
    }else{
        res.send("403");
    }
}
module.exports.changeMulti = async (req, res) => {
    if(res.locals.role.permissions.includes("products_edit")){
        const { status, ids } = req.body;
        switch (status) {
            case "active":
            case "inactive":
                await Product.updateMany({
                    _id: ids
                }, {
                    status: status
                });
                break;
            case "deleted":
                await Product.updateMany({
                    _id: ids
                }, {
                    deleted: true
                });
                break;
            default: break;
        }
        res.json({
            code: 200
        });
    }else{
        res.semd("403");
    }
}

module.exports.deleteItem = async (req, res) => {
    if(res.locals.role.permissions.includes("products_delete")){
        const id = req.params.id;
        await Product.updateOne({
            _id: id
        }, {
            deleted: true
        });
        req.flash('success', 'Xóa sản phẩm thành công!');
        res.json({
            code: 200
        });
    }
}
// thay doi thử tự
module.exports.changePosition = async (req, res) => {
    const id = req.params.id;
    const position = req.body.position;
    await Product.updateOne({
        _id: id
    }, {
        position: position
    });
    res.json({
        code: 200
    });
}
// [GET] /admin/products/create
module.exports.create = async (req, res) => {
    const id=req.params.id;
    const category=await ProductCategory.findOne({
        _id: id,
        deleted: false
    })
    const categories=await ProductCategory.find({
        deleted: false
    });
    const newCategories=createTreeHelper(categories);
    res.render("admin/pages/products/create", {
      pageTitle: "Thêm mới sản phẩm",
      categories: newCategories,
      category: category
    });
 }
//post creat
module.exports.createPost=async (req,res)=>{
    if(res.locals.role.permissions.includes("products_create")){
        req.body.price=parseInt(req.body.price);
        req.body.discountPercentage=parseInt(req.body.discountPercentage);
        req.body.stock=parseInt(req.body.stock);
        if(req.body.position){
            req.body.position=parseInt(req.body.position);
        }
        else{
            const countProduct=await Product.countDocuments({});
            req.body.position=countProduct+1;
        }
        req.body.createdBy = res.locals.account.id;
        const newProduct= new Product(req.body);
        await newProduct.save();
        res.redirect(`/${systemConfig.prefixAdmin}/products`);
    }else{
        res.send("403");
    }
}

// [GET] /admin/products/edit/:id
module.exports.edit = async (req, res) => {
    try {
      const id = req.params.id;
  
      const product = await Product.findOne({
        _id: id,
        deleted: false
      });
      if(product) {
        const categories = await ProductCategory.find({
          deleted: false
        });
    }
      
        const newCategories = createTreeHelper(categories);
  
      if(product) {
        res.render("admin/pages/products/edit", {
          pageTitle: "Chỉnh sửa sản phẩm",
          product: product,
          categories: newCategories
        });
      } else {
        res.redirect(`/${systemConfig.prefixAdmin}/products`);
      }
    } catch (error) {
      res.redirect(`/${systemConfig.prefixAdmin}/products`);
    }
  }
  
  // [PATCH] /admin/products/edit/:id
  module.exports.editPatch = async (req, res) => {
    if(res.locals.role.permissions.includes("products_edit")){
        try {
        const id = req.params.id;
    
    
        req.body.price = parseInt(req.body.price);
        req.body.discountPercentage = parseInt(req.body.discountPercentage);
        req.body.stock = parseInt(req.body.stock);
        if(req.body.position) {
            req.body.position = parseInt(req.body.position);
        } else {
            const countProducts = await Product.countDocuments({});
            req.body.position = countProducts + 1;
        }
        req.body.updatedBy = res.locals.account.id;
        await Product.updateOne({
            _id: id,
            deleted: false
        }, req.body);
    
        req.flash("success", "Cập nhật sản phẩm thành công!");
        } catch (error) {
        req.flash("error", "Id sản phẩm không hợp lệ!");
        }
    
        res.redirect("back");
    }else {res.send("403");}
}
// chi tiet san pham
module.exports.detail=async(req,res)=>{
    try{
        const id=req.params.id;
        const product=await Product.findOne({
            _id:    id,
            deleted: false
        });

        if(product){
            res.render("admin/pages/products/detail",{
                pageTitle: "Chi tiết sản phẩm",
                product: product
            });
        }
        else{
            res.redirect(`/$systemConfig.prefixAdmin`/products);
        }
    }catch(error){
        res.redirect(`/$systemConfig.prefixAdmin`/products);
    }
}
