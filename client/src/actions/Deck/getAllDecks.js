import axios from "axios";
import {
  GET_DECKS_SUCCESS,
  GET_DECK_REQUEST,
} from "../../constants/deckConstants";
import { setAlert } from "../../utils/alert";

export const getAllDecks = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_DECK_REQUEST,
    });
    const { data } = await axios.get("/api/deck");

    dispatch({
      type: GET_DECKS_SUCCESS,
      payload: data,
    });

  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(setAlert(message, "danger"));
  }
};
