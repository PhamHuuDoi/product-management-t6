const express=require("express");
const app=express();
const port=3000;

app.set("views","./views");
app.set("view engine", "pug");

app.get("/",(req,res)=>{
    res.render("index.pug");
});

app.get("/product",(req,res)=>{
    res.send("Trang danh sach san pham");
});

app.listen(port,()=>{
    console.log(`App listening on port ${port}`);
});