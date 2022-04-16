const DB = require("../../config/db");
const asyncHandler = require("../../middleware/async");
const Card = require("../../models/cardModel");
const Product = require("../../models/productModel");

/**
 *  @description  This function serves to return objects from the database, namely cards
 *                However this can also return other products as is the nature of the DB we are connecting too.
 *  @route        /api/cards
 *  @param        page     page number to pass into the database
 *  @param        keyword  string that is passed in to limit what cards are returned via their name.
 *  @param        category string passed in to limit what cards are returned by their category designation
 *
 *  @constant     cards Array of {Product} objects [{Product}, {Product}, ...{Products}] returned to the client
 *  @exports      JSON
 */
module.exports = asyncHandler(async (req, res) => {
  try {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};
    const category = req.query.category
      ? { category: { $regex: req.query.category, $options: "i" } }
      : {};
    const count = await Product.countDocuments({
      ...keyword,
      ...category,
    });
    const products = await Product.aggregate([
      {
        $match: { ...keyword, ...category },
      },
      {
        $addFields: {
          isInStock: {
            // Helper field. This is 1 if there are items in stock.
            $cond: {
              if: "$countInStock",
              then: 1,
              else: 0,
            },
          },
        },
      },
      {
        $sort: {
          isInStock: -1,
          price: -1,
        },
      },
      {
        $skip: pageSize * (page - 1),
      },
      {
        $limit: pageSize,
      },
    ]);

    res.json({
      products,
      page,
      pages: Math.ceil(count / pageSize),
      prevPage: page - 1,
      nextPage: page + 1,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Server Error: ${error.message}` });
  }
});
