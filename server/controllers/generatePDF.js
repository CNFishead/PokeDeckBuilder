const pdf = require("html-pdf");
const asyncHandler = require("../middleware/async");
const { error: errorHandler } = require("../middleware/error");
const fs = require("fs");

const Deck = require("../models/deckModel");
const DeckListTemp = require("../templates/DeckListTemp");
const Dynamic = require("../models/dynamicModel");

/**
 * @description Generate PDF document of deck list
 * @param       {Number} deckId - Deck ID
 * @returns     {String} - PDF document
 * @author      Austin Howard
 * @version     1.0.0
 * @since       1.0.0
 * @date        2022-5-30
 *
 */
module.exports = asyncHandler(async (req, res, next) => {
  try {
    // find the deck
    const deck = await Deck.findById(req.params.deckId);
    // get the logo of the application
    const logo = await Dynamic.findOne({ type: "Logo" });
    // check to see if the deck and logo exist
    if (!deck || !logo) {
      return res.status(404).json({
        message: "Cannot find deck or logo on Server",
      });
    }

    // need to sort cards by name
    await deck.cards.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      } else if (a.name > b.name) {
        return 1;
      } else {
        return 0;
      }
    });
    // console log one card so we can see what we're working with
    console.log(deck.cards[0]);
    // pass the deck to the template
    const html = DeckListTemp(deck, logo.value);
    // set up the html-to-pdf converter

    // we need to url encode the deck name in case there is any special characters
    // basically we just want to make sure any forward slashes are not in the deck name
    // so we replace them with a space
    // since any forward slash would cause the pdf to go to a subdirectory
    // and we don't want that
    deck.deck_name = deck.deck_name.replace(/\//g, " ");

    // we need to make the pdf a promise so we can await its creation
    await Promise.all([
      // create the pdf
      pdf
        .create(html, {
          format: "A3",
          border: {
            top: "1in",
            right: "1in",
            bottom: "1in",
            left: "1in",
          },
        })
        .toStream(async function (err, stream) {
          if (err) {
            console.log(err);
          } else {
            // pipe the stream to a file
            console.log(`Document created for ${deck.deck_name}`);
            res.writeHead(200, {
              "Content-Disposition": "application/pdf",
              filename: `${deck.deck_name}.pdf`,
            });
            stream.pipe(res);
          }
        }),
    ]);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: `Server Error - ${error.message}`,
    });
  }
});
