const ProductCategory=require("../../models/productCategory.model");
const systemConfig=require("../../config/system");
const createTreeheler=require("../../helpers/createTree.helper");
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
if(req.body.position) {
    req.body.position = parseInt(req.body.position);
} else {
    const countCagegory = await ProductCategory.countDocuments({});
    req.body.position = countCagegory + 1;
}

const newCategory = new ProductCategory(req.body);
await newCategory.save();

res.redirect(`/${systemConfig.prefixAdmin}/products-category`);
}