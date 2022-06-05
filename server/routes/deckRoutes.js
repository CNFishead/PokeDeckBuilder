const express = require("express");
const addCard = require("../controllers/Deck/addCard.js");
const createDeck = require("../controllers/Deck/createDeck.js");
const deleteDeck = require("../controllers/Deck/deleteDeck.js");
const getAllDecks = require("../controllers/Deck/getAllDecks.js");
const getDeck = require("../controllers/Deck/getDeck.js");
const removeCard = require("../controllers/Deck/removeCard.js");
const updateDeck = require("../controllers/Deck/updateDeck.js");
const generatePDF = require("../controllers/generatePDF.js");
const { admin, protect } = require("../middleware/authMiddleware.js");

const router = express.Router();

router.use(protect, admin);

router.route(`/`).post(createDeck).get(getAllDecks);
router.route("/:id").get(getDeck).delete(deleteDeck).put(updateDeck);
router.route("/:deckId/card/:productId/add").put(addCard);
router.route("/:deckId/card/:cardId/remove").put(removeCard);
router.route("/:deckId/pdf").post(generatePDF);

module.exports = router;
