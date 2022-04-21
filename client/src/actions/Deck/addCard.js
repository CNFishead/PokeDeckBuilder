import axios from "axios";
import {
  UPDATE_DECK_CARDS_ADD_SUCCESS,
  UPDATE_DECK_CARDS_FAIL,
  UPDATE_DECK_CARDS_REQUEST,
} from "../../constants/deckConstants";
import { setAlert } from "../../utils/alert";

export const addCard = (deckId, cardId) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_DECK_CARDS_REQUEST,
    });
    const { data } = await axios.put(`/api/deck/${deckId}/card/${cardId}/add`);

    dispatch({
      type: UPDATE_DECK_CARDS_ADD_SUCCESS,
      payload: data,
    });
    dispatch(setAlert(`Card: ${cardId} was successfully removed`, "success"));
  } catch (error) {
    dispatch({ type: UPDATE_DECK_CARDS_FAIL });
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(setAlert(message, "danger"));
  }
};
