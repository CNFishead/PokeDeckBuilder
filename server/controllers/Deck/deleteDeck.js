const asyncHandler = require("../../middleware/async");
const Card = require("../../models/cardModel");
const Deck = require("../../models/deckModel");
const Product = require("../../models/productModel");

/**
 *  @description  This function removes a deck from the database, and re-seeds whatever cards where in that deck
 *                back into the sellable stock
 *
 *  @route        DELETE /api/deck/:deckId
 *  @param        deckId ObjectID of the deck
 *  @comment      hitting this route will change the countInStock value of the {product}
 *                in the database by whatever cards where in the [deck.cards]
 *
 */
module.exports = asyncHandler(async (req, res) => {
  try {
    // find the deck
    const deck = await Deck.findById(req.params.id);
    // check if it exists
    if (!deck) {
      return res
        .status(404)
        .json({ message: `Deck: ${req.params.id} cannot be found` });
    }

    // we need to run a foreach command over every object in [deck.cards]

    for (const c of deck.cards) {
      // find the card
      const card = await Card.findById(c._id);
      // We then need to find the sellable { Product } and add back to it, so it can be sold/traded
      const product = await Product.findById(card.productId);
      // increase the amount of inStock sellable items, by 1.
      await product.set({ countInStock: product.countInStock + 1 });
      await product.save();
      // if we get here we want to remove the card object from the database, its just a placeholder.
      await card.remove();
    }

    // remove the deck
    await deck.remove();
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Server Error: ${error.message}` });
  }
});
