import {
  CARDS_CLEAR,
  DECK_CREATE_ERROR,
  DECK_CREATE_REQUEST,
  DECK_CREATE_RESET,
  DECK_CREATE_SUCCESS,
  GET_CARDS_FAIL,
  GET_CARDS_REQUEST,
  GET_CARDS_SUCCESS,
  GET_DECK,
  GET_DECKS_REQUEST,
  GET_DECKS_SUCCESS,
  GET_DECK_ERROR,
  GET_DECK_REQUEST,
  UPDATE_DECK_CARDS_ADD_SUCCESS,
  UPDATE_DECK_CARDS_FAIL,
  UPDATE_DECK_CARDS_REQUEST,
  UPDATE_DECK_CARDS_SUCCESS,
  UPDATE_DECK_FAIL,
  UPDATE_DECK_REQUEST,
  UPDATE_DECK_SUCCESS,
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
  state = { loading: false, deck: {} },
  action
) => {
  switch (action.type) {
    case UPDATE_DECK_REQUEST:
    case GET_DECK_REQUEST:
      return { ...state, loading: true };
    case GET_DECK:
      return { loading: false, deck: action.payload };
    case UPDATE_DECK_CARDS_SUCCESS:
      return {
        ...state,
        loading: false,
        deck: {
          ...state.deck,
          cards: state.deck.cards.filter((card) => card._id !== action.payload),
        },
      };
    case UPDATE_DECK_CARDS_ADD_SUCCESS:
      return {
        ...state,
        loading: false,
        deck: {
          ...state.deck,
          cards: [action.payload, ...state.deck.cards],
        },
      };
    case UPDATE_DECK_CARDS_FAIL:
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

export const updateDeckReducer = (
  state = { loading: false, success: false, deck: {} },
  action
) => {
  switch (action.type) {
    case UPDATE_DECK_CARDS_REQUEST:
      return { ...state, loading: true };
    case UPDATE_DECK_SUCCESS:
      return { ...state, loading: false, success: true, deck: action.payload };

    case UPDATE_DECK_FAIL:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export const cardsReducer = (
  state = { loading: false, success: false, cards: [] },
  action
) => {
  switch (action.type) {
    case GET_CARDS_REQUEST:
      return { ...state, loading: true };
    case GET_CARDS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        cards: action.payload.products,
      };

    case GET_CARDS_FAIL:
      return { ...state, loading: false };
    case CARDS_CLEAR:
      return { loading: false, success: false, cards: [] };
    default:
      return state;
  }
};
