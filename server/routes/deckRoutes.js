const express = require("express");
const addCard = require("../controllers/Deck/addCard.js");
const createDeck = require("../controllers/Deck/createDeck.js");
const getAllDecks = require("../controllers/Deck/getAllDecks.js");
const getDeck = require("../controllers/Deck/getDeck.js");
const removeCard = require("../controllers/Deck/removeCard.js");
const { admin, protect } = require("../middleware/authMiddleware.js");

const router = express.Router();

router.use(protect, admin);

router.route(`/`).post(createDeck).get(getAllDecks);
router.route("/:id").get(getDeck);
router.route("/:deckId/card/:productId/add").put(addCard);
router.route("/:deckId/card/:cardId/remove").put(removeCard);

module.exports = router;
