import {
  DYNAMIC_CONTENT_ERROR,
  DYNAMIC_CONTENT_REQUEST,
  GET_BANNER,
  GET_LOGO,
  UPDATE_BANNER,
  UPDATE_BANNER_RESET,
  UPDATE_LOGO,
  UPDATE_LOGO_RESET,
} from "../constants/dynamicConstants";

export const dynamicReducer = (
  state = {
    loading: false,
    logo: "",
    error: "",
    success: false,
  },
  action
) => {
  switch (action.type) {
    case DYNAMIC_CONTENT_REQUEST:
      return { ...state, loading: true };
    case DYNAMIC_CONTENT_ERROR:
      return { ...state, loading: false, error: action.payload };
    case GET_LOGO:
      return { ...state, loading: false, logo: action.payload };
    case UPDATE_LOGO:
      return { ...state, loading: false, logo: action.payload, success: true };
    case UPDATE_LOGO_RESET:
      return { ...state, loading: false, logo: {}, success: false };
    case GET_BANNER:
      return { ...state, loading: false, banner: action.payload };
    case UPDATE_BANNER:
      return {
        ...state,
        loading: false,
        banner: action.payload,
        success: true,
      };
    case UPDATE_BANNER_RESET:
      return { ...state, loading: false, banner: {}, success: false };
    default:
      return state;
  }
};
