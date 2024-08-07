const Product=require("../../models/product.model")
const paginationHelper=require("../../helpers/pagination.helper")
module.exports.index=async(req,res)=>{
    const find={
        deleted: true
    };

    const filterStatus=[{
        label:"Tất cả",
        value:""
    },
    {
        label:"Hoạt đoộng",
        value:"active"
    },
    {
        label:" Dừng hoạt động",
        value:"inactive"
    },
    ];
    if(req.query.status){
        find.status=req.query.status;
    }
    //tim kiem
    let keyword="";
    if(req.query.keyword){
        const regex=new RegExp(req.query.keyword,'i');
        find.title=regex;
        keyword=req.query.keyword;
    }
    
    //page
    const pagination=await paginationHelper(req,find);
    const products=await Product.find(find)
    .limit(pagination.limiItems)
    .skip(pagination.skip)
    .sort({
        position:"asc"
    });

    const {id ,statusChange}=req.params;
    res.render("admin/pages/garbage/index",{
    pageTitle:"Thùng rác",
    products: products, 
    keyword: keyword,
    filterStatus:filterStatus,
    pagination: pagination
    });
}
module.exports.deleteItemForever = async (req, res) => {
    const id = req.params.id;
    console.log(`Deleting product with id: ${id}`); // Log ID của sản phẩm
  
    try {
      const result = await Product.deleteOne({ _id: id });
      console.log(`Delete result: ${JSON.stringify(result)}`); // Log kết quả xóa
  
      res.json({ code: 200 });
    } catch (error) {
      console.error(`Error deleting product with id ${id}:`, error);
      res.status(500).json({ code: 500, message: 'Internal Server Error' });
    }
  };
// module.exports.undeleteItem=async(req,res)=>{
//     const id =req.params.id;
//     await Product.updateOne({
//         _id: id
//      },{
//         deleted: false
//      });
//     res.json({
//        code: 200
//     });
// }

module.exports.undeleteItem = async (req, res) => {
  const id = req.params.id;
  await Product.updateOne({
    _id: id
  },{
    deleted: false
  });
  req.flash('success', 'Phục hồi sản phẩm thành công!');
  res.json({
     code: 200
  });
  }