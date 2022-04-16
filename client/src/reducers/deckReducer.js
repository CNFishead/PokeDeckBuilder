import {
  GET_DECK,
  GET_DECKS_REQUEST,
  GET_DECKS_SUCCESS,
  GET_DECK_REQUEST,
} from "../constants/deckConstants";

export const listDeckReducer = (
  state = { loading: false, decks: [] },
  action
) => {
  switch (action.type) {
    case GET_DECKS_REQUEST:
      return { ...state, loading: true };
    case GET_DECKS_SUCCESS:
      return { loading: false, decks: action.payload };
    default:
      return state;
  }
};

export const getDeckReducer = (
  state = { loading: false, deck: null },
  action
) => {
  switch (action.type) {
    case GET_DECK_REQUEST:
      return { ...state, loading: true };
    case GET_DECK:
      return { loading: false, deck: action.payload };
    default:
      return state;
  }
};
