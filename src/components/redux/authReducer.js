import { stopSubmit } from "redux-form";
import { authAPI, securityAPI } from "../api/api";

const SET_AUTH_USER_DATA = "auth/SET_AUTH_USER_DATA";
const SET_CAPTCHA_URL = "auth/SET_CAPTCHA_URL";

const initialState = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
  captchaUrl: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH_USER_DATA:
    case SET_CAPTCHA_URL:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

const setUserAuthData = (userId, email, login, isAuth) => ({
  type: SET_AUTH_USER_DATA,
  payload: { userId, email, login, isAuth },
});
const setCaptchaUrl = (captchaUrl) => ({
  type: SET_CAPTCHA_URL,
  payload: { captchaUrl },
});

export const getUserAuthData = () => async (dispatch) => {
  const data = await authAPI.getAuthData();
  if (data.resultCode === 0) {
    const { id, email, login } = data.data;
    dispatch(setUserAuthData(id, email, login, true));
  }
};
export const loginUser = (email, passward, rememberMe, captcha) => async (
  dispatch
) => {
  const data = await authAPI.login(email, passward, rememberMe, captcha);
  if (data.resultCode === 0) {
    dispatch(getUserAuthData());
  } else {
    if (data.resultCode === 10) {
      dispatch(getCaptchaUrl());
    }
    let message = data.messages.length > 0 ? data.messages[0] : "Some error";
    dispatch(stopSubmit("login", { _error: message }));
  }
};
export const logOutUser = () => async (dispatch) => {
  const data = await authAPI.logOut();
  if (data.resultCode === 0) {
    dispatch(setUserAuthData(null, null, null, false));
  }
};
export const getCaptchaUrl = () => async (dispatch) => {
  const response = await securityAPI.getCaptchaUrl();
  const captchaUrl = response.url;
  dispatch(setCaptchaUrl(captchaUrl));
};

export default authReducer;
