
const dashboardRoute=require("./dashboard.route");
const productRoute=require("./product.route")
const garbageRoute=require("./garbage.route");
const productCategoryRoute=require("./productCategoryRoute");
const systemConfig=require("../../config/system")
module.exports.index = (app) => { 
    const part=`/${systemConfig.prefixAdmin}`
    app.use(`${part}/dashboard`,dashboardRoute);
    app.use(`${part}/products`,productRoute);
    app.use(`${part}/garbage`,garbageRoute);
    app.use(`${part}/`,productCategoryRoute);
    app.use(`${part}/products-category`,productCategoryRoute);
    
}