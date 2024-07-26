const Account=require("../../models/account.model");
const md5=require("md5");
const systemConfig=require("../../config/system");

//get /auth/login
module.exports.login=async(req,res)=>{
    res.render("admin/pages/auth/login",{
        pageTitle: "Đăng nhập"
    })
}
//post
module.exports.loginPost=async(req,res)=>{
    const email=req.body.email;
    const password=req.body.password;
    const account=await Account.findOne({
        email: email,
        deleted: false
    });
    if(!account){
        req.flash("error","Email không tồn tại");
        res.redirect("back");
        return;
    }
    if(md5(password)!=account.password){
        req.flash("error"," Sai mật khẩu");
        res.redirect("back");
        return;
    }
    if(account.status=="inactive"){
        req.flash("error","Tài khoản đã bị khóa");
        res.redirect("back");
        return;
       
    }
    res.cookie("token",account.token);
    res.redirect(`/${systemConfig.prefixAdmin}/dashboard`);
}
// get logout 
module.exports.logout = async (req, res) => {
    res.clearCookie("token");
    res.redirect(`/${systemConfig.prefixAdmin}/auth/login`);
}