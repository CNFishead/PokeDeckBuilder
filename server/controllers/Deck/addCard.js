const asyncHandler = require("../../middleware/async");
const Card = require("../../models/cardModel");
const Product = require("../../models/productModel");
const Deck = require("../../models/deckModel");

/**
 *  @description  This function adds a card to a deck
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
    const product = await Product.findById(req.params.productId);
    // check if it exists
    if (!product) {
      return res
        .status(404)
        .json({ message: `Product: ${req.params.productId} cannot be found` });
    }
    // * we need to make sure that the card we are targeting is a card we own, i.e, countInStock > 0
    if (product.countInStock <= 0) {
      return res.status(400).json({
        message: `You don't own or have enough in stock of that card to perform this action`,
      });
    }

    // Create a new Card object
    const card = await Card.create({
      user: req.user._id,
      productId: product._id,
      name: product.name,
      imageUrl: product.image,
    });
    // add the card to the the deck of cards
    deck.cards.unshift(card);
    // save the deck in the db
    await deck.save();

    // reduce the countInStock value of the product we are added to the deck.
    product.set({ countInStock: product.countInStock - 1 });
    product.save();

    // respond with the changes.

    res.status(200).json(card);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Server Error: ${error.message}` });
  }
});
