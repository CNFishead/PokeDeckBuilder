const mongoose = require("mongoose");

const deckSchema = mongoose.Schema(
  {
    deck_name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
    },
    image: {
      type: String,
      default: '/images/sample.jpg'
    },
    cards: [Object],
  },
  { timestamps: true }
);

const Deck = mongoose.model("Deck", deckSchema);

module.exports = Deck;
