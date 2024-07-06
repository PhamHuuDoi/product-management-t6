const Product=require("../../models/product.model")
module.exports.index=async(req,res)=>{
    const find={
        deleted: false
    };
    if(req.query.status){
        find.status=req.query.status;
    }
    console.log(req.query);
    const products=await Product.find(find);
    
    console.log(products);

    res.render("admin/pages/products/index",{
    pageTitle:"Quản lí  sản phẩm",
    products: products
    });
}     