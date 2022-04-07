const mongoose = require("mongoose");

const cardSchema = mongoose.Schema({}, { timestamps: true });

const Card = mongoose.model("Card", cardSchema);

module.exports = Card;
