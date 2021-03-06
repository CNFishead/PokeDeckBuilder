const asyncHandler = require("../../middleware/async");
const Deck = require("../../models/deckModel");

/**
 *  @description  This function creates a new Deck Object
 *
 *  @route        /api/deck
 *
 */
module.exports = getCard = asyncHandler(async (req, res) => {
  try {
    const newDeck = await Deck.create(req.body);
    res.status(201).json(newDeck);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Server Error: ${error.message}` });
  }
});
