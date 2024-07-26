const Role=require("../../models/role.model");
const systemConfig=require("../../config/system");
module.exports.index=async(req,res)=>{
    const records= await Role.find({
        deleted: false
    });
    res.render("admin/pages/roles/index",{
        pageTitle:" Nhóm quyền",
        records: records
    });
};
//get create
module.exports.create=async(req,res)=>{
    res.render("admin/pages/roles/create",{
        pageTitle: "Tạo mới nhóm quyền",
    });
};
//post create
module.exports.createPost=async(req,res)=>{
    const record=new Role(req.body);
    await record.save();

    res.redirect(`/${systemConfig.prefixAdmin}/roles`);
};
// get edit
module.exports.edit=async(req,res)=>{
    try{
        const id =req.params.id;
        const record =await Role.findOne({
            _id: id,
            deleted: false
        });
        res.render("admin/pages/roles/edit",{
            pageTitle: "Chỉnh sửa nhóm quyền",
            record: record
        });
    } catch(error){
        res.redirect(`/${systemConfig.prefixAdmin}/roles`);
    }
};
//patch edit
module.exports.editPatch=async (req,res)=>{
    try{
        const id=req.params.id;
        const data=req.body;
        console.log(req.body);
        await Role.updateOne({
            _id: id,
            deleted: false
        },data);
        req.flash("success","Cập nhật thành công");
        req.redirect("back"); 
    }catch (error){
        req.flash("error","Cập nhật không thành công");
        res.redirect( `/${systemConfig.prefixAdmin}/roles`);
    }
}
//get permision
module.exports.permissions=async(req,res)=>{
    const records=await Role.find({
        deleted: false
    });
    const permissions=[
        {name: "Sản phẩm",key:"products"},
        {name: "Thùng rác",key:"garbage"},
        {name: "Danh mục",key:"products-category"},
        {name: "Nhóm quyền",key:"roles" },
        {name: "Tài khoản admin",key:"accounts"}
    ];
    res.render("admin/pages/roles/permissions",{
        pageTitle:"Phân quyền",
        records: records,
        permissions: permissions
    })
}
//patch permission
module.exports.permissionsPatch=async(req,res)=>{
    const roles=req.body;
    for(const role of roles){
        await Role.updateOne({
            _id: role.id,
            deleted: false
        },{
            permissions: role.permissions
        });
    }
    res.json({
        code: 200,
        message:"Cập nhật thành công"
    })
}