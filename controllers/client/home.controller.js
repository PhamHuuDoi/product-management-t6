const Product=require("../../models/product.model");
module.exports.index=async(req,res)=>{
    const productsFeatured=await Product
    .find({
        deleted: false,
        status: "active",
        featured: "1"
    })
    .sort(({position: "desc"}))
    .limit(6)
    .select("-descirption");
    for(const item of productsFeatured){
        item.priceNew=((1-item.discountPercentage/100)*item.price).toFixed(0);
    }
        
    const productsNew = await Product
    .find({
        status: "active",
        deleted: false
    })
    .sort({ position: "desc" })
    .limit(6)
    .select("-description");

    for (const item of productsNew) {
        item.priceNew = ((1 - item.discountPercentage/100) * item.price).toFixed(0);
    }
    res.render("client/pages/home/index",{
     pageTitle:"Trang chu",
     productsFeatured: productsFeatured,
     productsNew: productsNew

    });
}