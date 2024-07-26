const ProductCategory = require("../../models/productCategory.model");
const createTreeHelper = require("../../helpers/createTree.helper");

module.exports.category = async (req, res, next) => {
  const categoryProducts = await ProductCategory.find({
    deleted: false,
    status: "active"
  });

  const newCategoryProducts = createTreeHelper(categoryProducts);

  res.locals.layoutCategoryProducts = newCategoryProducts

  next();
}