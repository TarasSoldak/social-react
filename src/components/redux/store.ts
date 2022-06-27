import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import authReducer from "./authReducer";
import profileReducer from "./profileReducer";
import usersReducer from "./usersReducer";
import { reducer as formReducer } from "redux-form";
import appReducer from "./appReducer";

const reducers = combineReducers({
  usersPage: usersReducer,
  profilePage: profileReducer,
  auth: authReducer,
  form: formReducer,
  app: appReducer,
});


export type InferActionsType<T> = T extends { [keys: string]: (...args: any[]) => infer U} ? U : never

export type RootState = ReturnType<typeof reducers>;

const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk),
    //@ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
