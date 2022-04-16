const asyncHandler = require("../../middleware/async");
const Deck = require("../../models/deckModel");

/**
 *  @description  This function adds a card to a deck
 *
 *  @route        GET /api/deck/:id
 *  @param        id ObjectID of the deck
 *
 */
module.exports = asyncHandler(async (req, res) => {
  try {
    const deck = await Deck.findById(req.params.id);
    if (!deck) {
      return res
        .status(404)
        .json({ message: `No Deck found with id: ${req.params.id}` });
    }

    res.status(200).json(deck);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Server Error: ${error.message}` });
  }
});
