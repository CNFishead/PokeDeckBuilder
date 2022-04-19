import { combineReducers } from "redux";

// reducers
import { alert } from "./alertReducer";
import { userLoginReducer } from "./authReducer";
import {
  deckCreateReducer,
  getDeckReducer,
  listDeckReducer,
  updateDeckReducer,
} from "./deckReducer";
import { uploadImageReducer } from "./uploadReducer";

export const rootReducer = combineReducers({
  // Reducer for Alert
  alert: alert,
  // Auth Reducers
  auth: userLoginReducer,
  // Deck Reducers
  listDecks: listDeckReducer,
  listDeckDetails: getDeckReducer,
  deckCreate: deckCreateReducer,
  updateDeck: updateDeckReducer,
  // upload reducers,
  imageUploader: uploadImageReducer,
});
