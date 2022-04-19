const asyncHandler = require("../../middleware/async");
const Deck = require("../../models/deckModel");

/**
 *  @description  This function updates the deck fields. it does NOT update the cards in the deck.
 *
 *  @route        PUT /api/deck/:id
 *  @param        id of the deck to update
 *
 */
module.exports = asyncHandler(async (req, res) => {
  try {
    // Find the Object we want to update
    const deck = await Deck.findById(req.params.id);
    if (!deck) {
      return res.status(404).json({
        message: `the deck with id: ${req.params.id} cannot be found`,
      });
    }
    // if it exists. update... save..
    const deckToUpdate = await Deck.findByIdAndUpdate(req.params.id, {
      ...req.body,
    });
    deckToUpdate.save();
    // respond with changes
    res.status(201).json(deckToUpdate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Server Error: ${error.message}` });
  }
});
