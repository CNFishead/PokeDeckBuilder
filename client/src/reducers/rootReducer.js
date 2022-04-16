import { combineReducers } from "redux";

// reducers
import { alert } from "./alertReducer";
import { userLoginReducer } from "./authReducer";
import { getDeckReducer, listDeckReducer } from "./deckReducer";

export const rootReducer = combineReducers({
  // Reducer for Alert
  alert: alert,
  // Auth Reducers
  auth: userLoginReducer,
  // Deck Reducers
  listDecks: listDeckReducer,
  listDeckDetails: getDeckReducer,
});
