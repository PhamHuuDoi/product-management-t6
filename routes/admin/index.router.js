
const dashboardRoute=require("./dashboard.route");
const productRoute=require("./product.route")
const garbageRoute=require("./garbage.route");
const productCategoryRoute=require("./productCategoryRoute");
const rolesRoute=require("./role.route");
const accountRoute=require("./account.route");
const authRoute=require("./auth.route");
const profileRoute=require("./profile.route");
const systemConfig=require("../../config/system");
const authMiddleware=require("../../middlewares/admin/auth.middlewares");

module.exports.index = (app) => { 
    const part=`/${systemConfig.prefixAdmin}`
    app.use(`${part}/auth`,authRoute);
    app.use(authMiddleware.requireAuth);
    app.use(`${part}/dashboard`,dashboardRoute);
    app.use(`${part}/products`, productRoute);
    app.use(`${part}/garbage`,garbageRoute);
    app.use(`${part}/`,productCategoryRoute);
    app.use(`${part}/products-category`,productCategoryRoute);
    app.use(`${part}/roles`,rolesRoute);
    app.use(`${part}/accounts`,accountRoute);
    app.use(`${part}/profile`,profileRoute); 
}