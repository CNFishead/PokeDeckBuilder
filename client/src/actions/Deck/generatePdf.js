import axios from "axios";
import {
  DECK_PREVIEW_REQUEST,
  DECK_PREVIEW_SUCCESS,
} from "../../constants/deckConstants";
import { setAlert } from "../../utils/alert";

export const generatePdf = (deck) => async (dispatch) => {
  try {
    dispatch({ type: DECK_PREVIEW_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/force-download",
      },
    };
    const data = await axios.post(`/api/deck/${deck._id}/pdf`, config);
    // console.log(data);
    // Create blob link to download
    // const blob = new Blob([data.data], { type: "application/pdf" });
    console.log(data.data);
    // url encode deck name
    deck.deck_name = deck.deck_name.replace(/\//g, " ");
    const url = `/pdf/${deck.deck_name}.pdf`
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${deck.deck_name}.pdf`);

    // Append to html link element page
    document.body.appendChild(link);

    // Start download
    link.click();

    // Clean up and remove the link
    link.parentNode.removeChild(link);
    dispatch({ type: DECK_PREVIEW_SUCCESS });
  } catch (error) {
    console.error(error);
    dispatch(setAlert(`problem generating pdf ${error}`, "danger"));
  }
};
