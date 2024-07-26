const Role = require("../../models/role.model");
const Account = require("../../models/account.model");
const md5 = require("md5");

const generateHelper = require("../../helpers/generate.helper");
const systemConfig = require("../../config/system");

module.exports.index =async  (req, res) => {
    if(res.locals.role.permissions.includes("accounts_view")){
        const records =await Account.find({
            deleted: false
        });
        for(const record of records){
            const role=await Role.findOne({
                _id: record.role_id,
                deleted: false
            })
            record.roleTitle=role.title;
        }
        res.render("admin/pages/accounts/index", {
            pageTitile: "Tài khoản admin",
            records: records
        });
    }
    else{
        res.send("403");
    }
};

// get create
module.exports.create = async (req, res) => {
    const roles = await Role.find({
        deleted: false
    }).select("title");
    res.render("admin/pages/accounts/create", {
        pageTitle: " Tạo tài khoản admin",
        roles: roles
    });
};
//post create
module.exports.createPost = async (req, res) => {
    if(res.locals.role.permissions.includes("accounts_create")){
        req.body.password = md5(req.body.password);
        req.body.token = generateHelper.generateRandomString(30);
        const account = new Account(req.body);
        await account.save();
        res.redirect(`/${systemConfig.prefixAdmin}/accounts`);
    }else{
        res.send("403");
    }
};
// get edit
module.exports.edit=async(req,res)=>{
    const id =req.params.id;
    const account=await Account.findOne({
        _id: id,
        deleted: false
    });
    const roles=await Role.find({
        deleted:false
    }).select("title");
    res.render("admin/pages/accounts/edit",{
        pageTitile: " Chỉnh sửa tài khoản admin",
        roles: roles,
        account: account
    })
}
//patch edit
module.exports.editPatch=async(req,res)=>{
    if(res.locals.role.permissions.includes("accounts_edit")){
        const id=req.params.id;
        if(req.body.password==""){
            delete req.body.password;
        }
        else{
            req.body.password=md5(req.body.password);
        }

        await Account.updateOne({
            _id: id,
            deleted: false
        },req.body);
        req.flash("success", " Cập nhật thành công");
        res.redirect("back");
    }else{
        res.send("403");
    }
}