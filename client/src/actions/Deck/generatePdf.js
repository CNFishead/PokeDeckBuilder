import axios from "axios";
import {
  DECK_PREVIEW_REQUEST,
  DECK_PREVIEW_SUCCESS,
} from "../../constants/deckConstants";
import { setAlert } from "../../utils/alert";

export const generatePdf = (deckId) => async (dispatch) => {
  try {
    dispatch({ type: DECK_PREVIEW_REQUEST });
    const data = await axios.post(`/api/deck/${deckId}/pdf`);
    console.log(data);
    // 1. Convert the data into 'blob'
    // 2. Create blob link to download
    console.log(`create a link to download the pdf`);
    const url = data.data;
    // console.log(`blob url is ${url}`);
    const link = document.createElement("a");
    console.log(`created link`);
    link.href = url;
    link.setAttribute("download", `${data.data}.pdf`);
    // 3. Append to html page
    document.body.appendChild(link);
    // 4. Force download
    link.click();
    // 5. Clean up and remove the link
    link.parentNode.removeChild(link);
    dispatch({ type: DECK_PREVIEW_SUCCESS, payload: data });
  } catch (error) {
    console.error(error);
    dispatch(setAlert(`problem generating pdf ${error}`, "danger"));
  }
};
