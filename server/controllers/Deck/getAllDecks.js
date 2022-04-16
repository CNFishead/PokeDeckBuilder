const asyncHandler = require("../../middleware/async");
const Deck = require("../../models/deckModel");

/**
 *  @description  This function returns all Decks from the database
 *
 *  @route        GET /api/deck
 *
 */
module.exports = asyncHandler(async (req, res) => {
  try {
    const decks = await Deck.find({});
    res.status(200).json(decks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Server Error: ${error.message}` });
  }
});
