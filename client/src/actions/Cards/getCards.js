import axios from "axios";
import {
  GET_CARDS_FAIL,
  GET_CARDS_REQUEST,
  GET_CARDS_SUCCESS,
} from "../../constants/deckConstants";
import { setAlert } from "../../utils/alert";

export const getCards = (keyword) => async (dispatch) => {
  try {
    dispatch({
      type: GET_CARDS_REQUEST,
    });
    const { data } = await axios.get(`/api/card?keyword=${keyword}`);

    dispatch({
      type: GET_CARDS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: GET_CARDS_FAIL });
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(setAlert(message, "danger"));
  }
};
