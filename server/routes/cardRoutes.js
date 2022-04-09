const express = require("express");
const getCard = require("../controllers/Cards/getCard.js");
const getCards = require("../controllers/Cards/getCards.js");
const { admin, protect } = require("../middleware/authMiddleware.js");

const router = express.Router();

router.route(`/`).get(protect, getCards);
router.route("/:id").get(protect, getCard);

module.exports = router;
