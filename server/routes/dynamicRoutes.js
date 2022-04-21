const express = require("express");
const getContent = require("../controllers/Dynamic/getContent.js");

const router = express.Router();

router.route("/:type").get(getContent);

module.exports = router;
