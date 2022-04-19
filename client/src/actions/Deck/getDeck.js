import axios from "axios";
import {
  GET_DECK,
  GET_DECK_ERROR,
  GET_DECK_REQUEST,
} from "../../constants/deckConstants";
import { setAlert } from "../../utils/alert";

export const getDeck = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_DECK_REQUEST,
    });
    const { data } = await axios.get(`/api/deck/${id}`);

    dispatch({
      type: GET_DECK,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: GET_DECK_ERROR });
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(setAlert(message, "danger"));
  }
};
