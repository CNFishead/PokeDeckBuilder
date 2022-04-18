import {
  DECK_CREATE_ERROR,
  DECK_CREATE_REQUEST,
  DECK_CREATE_RESET,
  DECK_CREATE_SUCCESS,
  GET_DECK,
  GET_DECKS_REQUEST,
  GET_DECKS_SUCCESS,
  GET_DECK_ERROR,
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
    case GET_DECK_ERROR:
      return { ...state, loading: false };
    default:
      return state;
  }
};
export const deckCreateReducer = (
  state = { loading: false, success: false, deck: null },
  action
) => {
  switch (action.type) {
    case DECK_CREATE_REQUEST:
      return { loading: true };
    case DECK_CREATE_SUCCESS:
      return { loading: false, success: true, deck: action.payload };
    case DECK_CREATE_ERROR:
      return { loading: false, error: action.payload };
    case DECK_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
