const asyncHandler = require("../../middleware/async");
const Card = require("../../models/cardModel");
const Deck = require("../../models/deckModel");
const Product = require("../../models/productModel");

/**
 *  @description  This function removes a card from the deck.
 *
 *  @route        /api/deck/:deckId/card/:cardId
 *  @param        deckId ObjectID of the deck
 *  @param        cardId ObjectID of the card to add.
 *  @comment      hitting this route will change the countInStock value of the {product}
 *                in the database by -1
 *
 */
module.exports = asyncHandler(async (req, res) => {
  try {
    // find the deck
    const deck = await Deck.findById(req.params.deckId);
    // check if it exists
    if (!deck) {
      return res
        .status(404)
        .json({ message: `Deck: ${req.params.deckId} cannot be found` });
    }
    // find the card
    const card = await Card.findById(req.params.cardId);
    // check if it exists
    if (!card) {
      return res
        .status(404)
        .json({ message: `Card: ${req.params.cardId} cannot be found` });
    }
    // add the card to the the deck of cards
    deck.cards = deck.cards.filter((c) => {
      console.log(
        `c: ${c._id} vs card: ${card.id} === ${
          c._id.toString() === card.id.toString()
        }`
      );
      return c._id.toString() !== card.id.toString();
    });
    // save the deck in the db
    await deck.save();

    // We then need to find the sellable { Product } and add back to it, so it can be sold/traded
    const product = await Product.findById(card.productId);
    // error checking
    if (!product) {
      return res
        .status(400)
        .json({ message: `Problem adding card back to sellable inventory.` });
    }
    // increase the amount of inStock sellable items, by 1.
    product.set({ countInStock: product.countInStock + 1 });
    product.save();

    // if we get here we want to remove the card object from the database, its just a placeholder.
    await card.remove();

    // respond with the changes.

    res.status(200).json(deck);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Server Error: ${error.message}` });
  }
});
