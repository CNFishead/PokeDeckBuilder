const mongoose = require("mongoose");

const cardSchema = mongoose.Schema({}, { strict: false });

const Card = mongoose.model("Product", cardSchema);

module.exports = Card;
