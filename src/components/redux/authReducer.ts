import { InferActionsType, RootState } from './store';
import { FormAction, stopSubmit } from "redux-form";
import { ThunkAction } from "redux-thunk";
import { authAPI } from "../api/auth-api";
import { securityAPI } from '../api/security-api';



type InitialStateType = {
  userId: number | null
  email: string | null
  login: string | null
  isAuth: boolean
  captchaUrl: string | null
};

const initialState: InitialStateType = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
  captchaUrl: null,
};

const authReducer = (state = initialState, action: AuthActionType): InitialStateType => {
  switch (action.type) {
    case 'SET_AUTH_USER_DATA':
    case 'SET_CAPTCHA_URL':
      return { ...state, ...action.payload};
    default:
      return state;
  }
};
type AuthActionType =  InferActionsType < typeof actions >

const actions={
 setUserAuthData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
    type: 'SET_AUTH_USER_DATA',
    payload: { userId, email, login, isAuth },
  } as const),
 setCaptchaUrl: (captchaUrl: string) => ({
  type: 'SET_CAPTCHA_URL',
  payload: { captchaUrl },
} as const)
}

type ThunkAuthType = ThunkAction<Promise<void>, RootState, unknown, AuthActionType | FormAction>
export const getUserAuthData = (): ThunkAuthType => async (dispatch) => {
  const data = await authAPI.getAuthData();
  if (data.resultCode === 0) {
    const { id, email, login } = data.data;
    dispatch(actions.setUserAuthData(id, email, login, true));
  }
};
export const loginUser = (email: string, passward: string, rememberMe: boolean, captcha: string):
 ThunkAuthType => async (dispatch) => {
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
export const logOutUser = (): ThunkAuthType => async (dispatch) => {
  const data = await authAPI.logOut();
  if (data.resultCode === 0) {
    dispatch(actions.setUserAuthData(null, null, null, false));
  }
};
export const getCaptchaUrl = (): ThunkAuthType => async (dispatch) => {
  const response = await securityAPI.getCaptchaUrl();
  const captchaUrl = response.url;
  dispatch(actions.setCaptchaUrl(captchaUrl));
};

export default authReducer;
