import { ALL_ARTICLES, ALL_TAGS } from "./types";

export function allArticles(payload) {
  return {
    type: ALL_ARTICLES,
    payload,
  };
}

export function fetchArticle(url) {
  return function (dispatch) {
    fetch(url)
      .then((res) => res.json())
      .then(({ articles }) => dispatch(allArticles(articles)));
  };
}

export function allTags(payload) {
  return {
    type: ALL_TAGS,
    payload,
  };
}
