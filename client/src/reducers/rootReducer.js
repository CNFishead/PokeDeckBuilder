import { combineReducers } from "redux";

// reducers
import { alert } from "./alertReducer";
import { userLoginReducer } from "./authReducer";
import {
  cardsReducer,
  deckCreateReducer,
  getDeckReducer,
  listDeckReducer,
  updateDeckReducer,
} from "./deckReducer";
import { dynamicReducer } from "./dynamicReducer";
import { uploadImageReducer } from "./uploadReducer";

export const rootReducer = combineReducers({
  // dynamic
  dynamic: dynamicReducer,
  // Reducer for Alert
  alert: alert,
  // Auth Reducers
  auth: userLoginReducer,
  // Deck Reducers
  listDecks: listDeckReducer,
  listDeckDetails: getDeckReducer,
  deckCreate: deckCreateReducer,
  updateDeck: updateDeckReducer,
  // Cards
  cards: cardsReducer,
  // upload reducers,
  imageUploader: uploadImageReducer,
});
