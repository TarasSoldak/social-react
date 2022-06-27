import { ThunkAction } from "redux-thunk";
import { getUserAuthData } from "./authReducer";
import { InferActionsType, RootState } from "./store";



const initialState = {
  initialization: false,
};
type InitialStateType = typeof initialState

const appReducer = (state = initialState, action: SetInitializationActionType): InitialStateType => {
  switch (action.type) {
    case 'INITIALIZATION_SUCCESS':
      return { ...state, initialization: true };
    default:
      return state;
  }
};
type SetInitializationActionType = InferActionsType<typeof actions>


export const actions = {
  setInitialization: () => ( { type: 'INITIALIZATION_SUCCESS' } as const)
}


type ThunkAppType = ThunkAction<Promise<void>, RootState, unknown, SetInitializationActionType>
export const initializationApp = (): ThunkAppType => async (dispatch) => {
  const promise = await dispatch(getUserAuthData());
  Promise.all([promise]).then(() => {
    dispatch(actions.setInitialization());
  });
};

export default appReducer;
