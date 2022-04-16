const mongoose = require("mongoose");

const productSchema = mongoose.Schema({}, { strict: false });

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
