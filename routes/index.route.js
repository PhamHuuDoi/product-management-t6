module.exports.index = (app) => { 
    app.get("/", (req,res)=>{
        res.render("client/pages/home/index");
    });

    app.get("/product", (req,res)=>{
        res.render("client/pages/products/index");
    });
};