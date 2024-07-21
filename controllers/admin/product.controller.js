const Product = require("../../models/product.model");
const ProductCategory=require("../../models/productCategory.model");
const systemConfig = require("../../config/system");
const paginationHelper = require("../../helpers/pagination.helper")
const createTreeHelper=require("../../helpers/createTree.helper");
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
}
module.exports.changeMulti = async (req, res) => {
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
}

module.exports.deleteItem = async (req, res) => {
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
    const newProduct= new Product(req.body);
    await newProduct.save();
    res.redirect(`/${systemConfig.prefixAdmin}/products`);
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
        res.render("admin/pages/products/edit", {
          pageTitle: "Chỉnh sửa sản phẩm",
          product: product
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
  
      await Product.updateOne({
        _id: id,
        deleted: false
      }, req.body);
  
      req.flash("success", "Cập nhật sản phẩm thành công!");
    } catch (error) {
      req.flash("error", "Id sản phẩm không hợp lệ!");
    }
  
    res.redirect("back");
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
