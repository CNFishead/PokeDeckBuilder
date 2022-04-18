import axios from "axios";
import {
  DECK_DELETE_FAIL,
  DECK_DELETE_REQUEST,
  DECK_DELETE_SUCCESS,
} from "../../constants/deckConstants";
import { setAlert } from "../../utils/alert";

export const deleteDeck = (id) => async (dispatch) => {
  try {
    if (
      window.confirm(
        "Are you sure you want to delete this deck? This action cannot be undone"
      )
    ) {
      dispatch({
        type: DECK_DELETE_REQUEST,
      });
      const { data } = await axios.delete(`/api/deck/${id}`);

      dispatch({
        type: DECK_DELETE_SUCCESS,
        payload: data,
      });
      dispatch(setAlert(`Deck: ${id} was deleted!`, "success"));
      window.location.reload();
    }
  } catch (error) {
    dispatch({ type: DECK_DELETE_FAIL });
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(setAlert(message, "danger"));
  }
};
