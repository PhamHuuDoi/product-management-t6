
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
    //app.use(authMiddleware.requireAuth);
    app.use(`${part}/dashboard`,authMiddleware.requireAuth,dashboardRoute);
    app.use(`${part}/products`, authMiddleware.requireAuth,productRoute);
    app.use(`${part}/garbage`,authMiddleware.requireAuth,garbageRoute);
    app.use(`${part}/`,authMiddleware.requireAuth,productCategoryRoute);
    app.use(`${part}/products-category`,authMiddleware.requireAuth,productCategoryRoute);
    app.use(`${part}/roles`,authMiddleware.requireAuth,rolesRoute);
    app.use(`${part}/accounts`,authMiddleware.requireAuth,accountRoute);
    app.use(`${part}/profile`,authMiddleware.requireAuth,profileRoute); 
}