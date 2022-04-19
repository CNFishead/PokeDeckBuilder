import axios from "axios";
import {
  GET_DECK,
  UPDATE_DECK_FAIL,
  UPDATE_DECK_REQUEST,
  UPDATE_DECK_SUCCESS,
} from "../../constants/deckConstants";
import { setAlert } from "../../utils/alert";

export const updateDeck = (form) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_DECK_REQUEST,
    });
    const { data } = await axios.put(`/api/deck/${form._id}`, form);

    dispatch({
      type: UPDATE_DECK_SUCCESS,
      payload: data,
    });
    dispatch(
      setAlert(`Deck: ${form.deck_name} was successfully updated`, "success")
    );
    window.location.reload();
  } catch (error) {
    dispatch({ type: UPDATE_DECK_FAIL });
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(setAlert(message, "danger"));
  }
};
