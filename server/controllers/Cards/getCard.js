const { ObjectId } = require("mongodb");
const asyncHandler = require("../../middleware/async");

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
module.exports = getCard = asyncHandler(async (req, res) => {
  try {
    const card = await req.db
      .collection("products")
      // ! You have to have the ObjectId from mongodb to query correctly.
      // ? For some reason though, you dont need it when querying for a user...
      .findOne({ _id: ObjectId(req.params.id) });
    if (!card) {
      return res
        .status(404)
        .json({ message: `Card: ${req.params.id} Wasnt found` });
    }
    res.status(200).json(card);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Server Error: ${error.message}` });
  }
});
