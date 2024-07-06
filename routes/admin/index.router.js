
const dashboardRoute=require("./dashboard.route");
const productRoute=require("./product.route")
const systemConfig=require("../../config/system")
module.exports.index = (app) => { 
    const part=`/${systemConfig.prefixAdmin}`
    app.use(`${part}/dashboard`,dashboardRoute);
    app.use(`${part}/products`,productRoute);
}