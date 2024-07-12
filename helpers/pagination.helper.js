const Product=require("../models/product.model");
module.exports =async(req,find)=>{
    const pagination={
        currentPage: 1,
        limiItems: 4
    }
    if(req.query.page)
    {
        pagination.currentPage=parseInt(req.query.page);
    }
    pagination.skip=(pagination.currentPage-1)*pagination.limiItems;

    const countProducts=await Product.countDocuments(find);
    const totalPage=Math.ceil(countProducts/pagination.limiItems);
    pagination.totalPage=totalPage;
    return pagination;
}