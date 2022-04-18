import axios from "axios";
import {
  DECK_CREATE_ERROR,
  DECK_CREATE_REQUEST,
  DECK_CREATE_SUCCESS,
} from "../../constants/deckConstants";
import { setAlert } from "../../utils/alert";

export const createNewDeck = (deck) => async (dispatch) => {
  try {
    dispatch({
      type: DECK_CREATE_REQUEST,
    });
    const { data } = await axios.post("/api/deck", deck);

    dispatch({
      type: DECK_CREATE_SUCCESS,
      payload: data,
    });
    dispatch(setAlert(`Deck: ${deck.deck_name} was created!`, "success"));
  } catch (error) {
    dispatch({ type: DECK_CREATE_ERROR });
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(setAlert(message, "danger"));
  }
};
