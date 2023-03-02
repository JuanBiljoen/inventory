// In this file, you will find all the code needed to perform Product CRUD operations using Mongoose. 
//After performing any CRUD operation, we return an array of all the relevant documents in the DB.

//importing model and mongoose
const Product = require("../models/product.model.js");
var ObjectId = require("mongoose").Types.ObjectId;

exports.addProduct = async function (product) {
  // Create and Save a new product
  let productModel = new Product({
    name: product.name,
    description: product.description,
    price: product.price,
  });
  const newProduct = await productModel.save();

  const products = await Product.find({});
  return products;
};

// Get all the product documents in the DB
exports.findAllProducts = async function () {
  const products = await Product.find({});

  return products;
};

// Update product by ID
exports.updateProduct = async function (product) {
  let updatedProduct = await Product.findByIdAndUpdate(product.id, product);

  const products = await Product.find({});
  return products;
};

// Delete product by ID
exports.deleteProduct = async function (productId, authorId) {
  const productToDelete = await Product.findByIdAndDelete(productId);

  const products = await Product.find({});
  return products;
};
