const md5=require("md5");
const User=require("../../models/user.model");
const generateHelper=require("../../helpers/generate.helper");
//get /user/register
module.exports.register=(req,res)=>{
    res.render("client/pages/user/register",{
        pageTitle:"Đăng ký tài khoản"
    });
}
//post /user/regiter
module.exports.registerPost=async(req,res)=>{
    const existUser=await User.findOne({
        email: req.body.email,
        deleted: false
    });
    if(existUser){
        req.flash("error", "Email đã tồn tại")
        res.redirect("back");
        return;
    }
    const userData={
        fullName: req.body.fullName,
        email: req.body.email,
        phone: req.body.phone,
        password: md5(req.body.password),
        tokenUser:generateHelper.generateRandomString(30)
    }
    const user=new User(userData);
    user.save();
    res.cookie("tokenUser",user.tokenUser);
    req.flash("success", "Đăng ký thành công");
    res.redirect("/");
}