import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { ALL_ARTICLES, ALL_TAGS } from "./types";

const initialState = {
  articles: [],
  tags: [],
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case ALL_ARTICLES:
      return { ...state, articles: action.payload };
    case ALL_TAGS:
      return { ...state, tags: action.payload };
    default:
      return state;
  }
}

let thunk = (storeObj) => (next) => (action) => {
  if (typeof action === "function") {
    return action(storeObj.dispatch);
  }
  return next(action);
};

export const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
);
