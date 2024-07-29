const Product=require("../../models/product.model");

//get /search
module.exports.index=async(req,res)=>{
    const keyword=req.query.keyword;
    let products=[];
    if(keyword){
        const regex=new RegExp(keyword,"i");
        products=await Product.find({
            title: regex,
            deleted: false,
            status: "active"

        });

        for(item of products){
            item.priceNew = ((1 - item.discountPercentage/100) * item.price).toFixed(0);
        }
    }
    res.render("client/pages/search/index",{
        pageTitile: "Tìm kiếm",
        keyword: keyword,
        products: products
    })

}