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
router.get("/edit/:id",controller.edit);
router.post(
    "/edit/:id",
    upload.single('thumbnail'),
    uploadCloud.uploadSingle,
    controller.editPost
)
router.get("/detail/:id",controller.deltail);
router.get('/change-status/:statusChange/:id', controller.changeStatus);
module.exports=router;