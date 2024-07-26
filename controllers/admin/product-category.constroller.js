const ProductCategory=require("../../models/productCategory.model");
const systemConfig=require("../../config/system");
const createTreeheler=require("../../helpers/createTree.helper");
const Product = require("../../models/product.model");

const createTreeHelper = require("../../helpers/createTree.helper");
module.exports.index=async(req,res)=>{
    const records=await ProductCategory.find({
        deleted: false
    });
    res.render("admin/pages/products-category/index",{
        pageTitle: "Danh mục sản phẩm",
        records: records
    });
}

//create get
module.exports.create=(req,res)=>{
    res.render("admin/pages/products-category/create",{
        pageTitle:"Thêm mới danh mục sản phẩm"
    })
}
//creat post
module.exports.create = async(req, res) => {
    const categories= await ProductCategory.find({
        deleted: false
    });
    const newCategories=createTreeheler(categories);
    console.log(newCategories);
    res.render("admin/pages/products-category/create", {
      pageTitle: "Thêm mới danh mục sản phẩm",
      categories: newCategories
    });
}

// [POST] /admin/products-category/create
module.exports.createPost = async (req, res) => {
    if(res.locals.role.permissions.includes("products-category_create")) {
        if(req.body.position) {
            req.body.position = parseInt(req.body.position);
        } else {
            const countCagegory = await ProductCategory.countDocuments({});
            req.body.position = countCagegory + 1;
        }

        const newCategory = new ProductCategory(req.body);
        await newCategory.save();

        res.redirect(`/${systemConfig.prefixAdmin}/products-category`);
    }else{
        res.send("403");
    }
}
//get edit
module.exports.edit=async (req,res)=>{
    const id =req.params.id;
    const category=await ProductCategory.findOne({
        _id:id,
        deleted: false
    })
    const categories=await ProductCategory.find({
        deleted: false
    })

    const newCategories=createTreeheler(categories);
    res.render(`admin/pages/products-category/edit`,{
        pageTitle: "Trang chỉnh sửa danh mục",
        category: category,
        categories: newCategories
    })
}
// Post edit
module.exports.editPost=async(req,res)=>{
    if(res.locals.role.permissions.includes("products-category_edit")){
        const id =req.params.id;
        if(req.body.position){
            req.body.position=parseInt(req.body.position)
        }else{
            const coutCategory=await ProductCategory.countDocuments({});
            req.body.position=coutCategory+1;
        }
        await ProductCategory.updateOne({
            _id: id,
            deleted: false
        },req.body);
        req.flash('success', 'Cập nhật trạng thái thành công!');
        res.redirect("back");
    }else{
        res.send("403");
    }
}
module.exports.deltail=async(req,res)=>{
    const id=req.params.id;
    const category=await ProductCategory.findOne({
        _id: id,
        deleted: false
    });
    const categories=await ProductCategory.find({
        deleted: false
    });
    const newCategories=createTreeHelper(categories);
    res.render("admin/pages/products-category/detail",{
        pageTitle: "Trang chi tiết sản phẩm",
        category: category,
        categories: newCategories
    });
}
module.exports.changeStatus = async (req, res) => {
    if(res.locals.role.permissions.includes("products-category_edit")){
        const { id, statusChange } = req.params;
        await ProductCategory.updateOne({
            _id: id
        },{
            statusChange: statusChange
        })
        req.flash('success', 'Cập nhật trạng thái thành công!');
        res.json({
            code: 200
        });
    }else{
        res.send("403");
    }
}
module.exports.deleteItem = async (req, res) => {
    if(res.locals.role.permissions.includes("products-category_delete")){
        const id = req.params.id;
        await ProductCategory.updateOne({
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