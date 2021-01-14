import { getUserAuthData } from "./authReducer";
const INITIALIZATION_SUCCESS = "initialization/INITIALIZATION_SUCCESS";

const initialState = {
  initialization: false,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZATION_SUCCESS:
      return { ...state, initialization: true };
    default:
      return state;
  }
};

const setInitialization = () => {
  return { type: INITIALIZATION_SUCCESS };
};

export const initializationApp = () => async (dispatch) => {
  const promise = await dispatch(getUserAuthData());
  Promise.all([promise]).then(() => {
    dispatch(setInitialization());
  });
};

export default appReducer;
