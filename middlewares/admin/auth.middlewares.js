const systemConfig = require("../../config/system");
const Account = require("../../models/account.model");
const Role=require("../../models/role.model");
module.exports.requireAuth = async (req, res, next) => {
  if(!req.cookies.token) {
    res.redirect(`/${systemConfig.prefixAdmin}/auth/login`);
    return;
  }

  const account = await Account.findOne({
    token: req.cookies.token,
    deleted: false
  }).select("fullName email phone avatar role_id status");
  const role=await Role.findOne({
    _id: account.role_id
  }).select("title permissions");

  if(!account) {
    res.redirect(`/${systemConfig.prefixAdmin}/auth/login`);
    return;
  }
  res.locals.role=role;
  res.locals.account=account;
  next();
}