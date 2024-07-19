const express=require("express");
const multer=require("multer");
const router=express.Router();
const uploadCloud=require("../../middlewares/admin/uploadCloud.middlware");
const upload=multer();
const controller=require("../../controllers/admin/product-category.constroller");

router.get("/",controller.index);
router.get("/create",controller.create);
router.post(
    "/create",
    upload.single('thumbnail'),
    uploadCloud.uploadSingle,
    controller.createPost
)
module.exports=router;