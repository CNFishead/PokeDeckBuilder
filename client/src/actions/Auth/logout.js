import { USER_LOGOUT } from "../../constants/authConstants";

export const logout = () => (dispatch) => {
  localStorage.removeItem("user");
  dispatch({ type: USER_LOGOUT });
  document.location.href = "/";
};
