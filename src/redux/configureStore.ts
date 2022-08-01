import { createStore, applyMiddleware, combineReducers } from "redux";
import { setUserReducer } from "./reducers/setUserReducer";
import logger from "redux-logger";

// const reducers = combineReducers({
//   user: setUserReducer,
// });

export const configureStore = () =>
  createStore(setUserReducer, applyMiddleware(logger));
