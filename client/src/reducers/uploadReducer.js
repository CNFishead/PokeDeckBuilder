import {
  UPLOAD_IMAGE_FAIL,
  UPLOAD_IMAGE_REQUEST,
  UPLOAD_IMAGE_SUCCESS,
} from "../constants/uploadConstants";

export const uploadImageReducer = (
  state = { imageUrl: "", loading: false },
  action
) => {
  switch (action.type) {
    case UPLOAD_IMAGE_REQUEST:
      return { loading: true };
    case UPLOAD_IMAGE_SUCCESS:
      return {
        loading: false,
        imageUrl: action.payload,
      };
    case UPLOAD_IMAGE_FAIL:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
