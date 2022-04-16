const { ObjectId } = require("mongodb");
const asyncHandler = require("../../middleware/async");
const Product = require("../../models/productModel");

/**
 *  @description  This function serves to return an object from the Products db
 *
 *  @route        /api/card/:id
 *
 *  @param        id ObjectId of the product you wish to fetch
 *
 *  @constant     card {Product} object
 *  @exports      JSON
 */
module.exports = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ message: `product: ${req.params.id} Wasnt found` });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Server Error: ${error.message}` });
  }
});
