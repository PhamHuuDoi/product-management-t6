const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);

const productSchema = new mongoose.Schema({
    title: String,
    product_category_id: String,
    description: String,
    price: Number,
    discountPercentage: Number,
    stock: Number,
    thumbnail: String,
    status: String,
    position: Number,
    createdBy: String,
    updatedBy: String,
    featured: String,
    deleted: {
        type: Boolean,
        default: false
    },
    deletedBy: String,
    slug: {
        type: String,
        slug: "title",
        unique: true
    }
}, {
    timestamps: true
})
const Product = mongoose.model('Product', productSchema, "products");

module.exports = Product;