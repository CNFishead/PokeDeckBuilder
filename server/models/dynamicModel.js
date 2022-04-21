const mongoose = require("mongoose");

const dynamicContentSchema = new mongoose.Schema({}, { strict: false });

const Dynamic = mongoose.model("Dynamic", dynamicContentSchema);

module.exports = Dynamic;
