const mongoose=require('mongoose');
module.exports.connect=async()=>{
    try {
        await mongoose.connect(process.env.mongoose_Url);
        console.log("ket noi thanh cong");
    } catch (error) {
        console.log("ket noi that bai");
    }
   
}