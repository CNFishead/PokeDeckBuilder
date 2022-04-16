const asyncHandler = require("../../middleware/async");
const Card = require("../../models/cardModel");

/**
 *  @description  This function creates a new Deck Object
 *
 *  @route        /api/deck
 *
 *  @constant     card {Product} object
 */
module.exports = getCard = asyncHandler(async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
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
