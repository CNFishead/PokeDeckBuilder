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
    cards: [{ type: mongoose.Schema.Types.ObjectId, ref: "Card" }],
  },
  { timestamps: true }
);

const Deck = mongoose.model("Deck", deckSchema);

module.exports = Deck;
