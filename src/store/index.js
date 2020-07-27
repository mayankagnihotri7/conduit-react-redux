import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  ALL_ARTICLES,
  ALL_TAGS,
  USER,
  ARTICLE,
  COMMENT,
  VISIT_USER,
} from "./types";

const initialState = {
  articles: [],
  article: "",
  tags: [],
  user: {},
  visitUser: {},
  comments: [],
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case ALL_ARTICLES:
      return { ...state, articles: action.payload };
    case ARTICLE:
      return { ...state, article: action.payload };
    case ALL_TAGS:
      return { ...state, tags: action.payload };
    case USER:
      return { ...state, user: action.payload };
    case VISIT_USER:
      return { ...state, visitUser: action.payload };
    case COMMENT:
      return { ...state, comments: action.payload };
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
