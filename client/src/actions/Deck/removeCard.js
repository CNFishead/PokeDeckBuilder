import axios from "axios";
import {
  UPDATE_DECK_CARDS_FAIL,
  UPDATE_DECK_CARDS_REQUEST,
  UPDATE_DECK_CARDS_SUCCESS,
} from "../../constants/deckConstants";
import { setAlert } from "../../utils/alert";

export const removeCard = (deckId, cardId) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_DECK_CARDS_REQUEST,
    });
    const { data } = await axios.put(
      `/api/deck/${deckId}/card/${cardId}/remove`
    );

    dispatch({
      type: UPDATE_DECK_CARDS_SUCCESS,
      payload: cardId,
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
