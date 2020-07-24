import { ALL_ARTICLES, ALL_TAGS, USER } from "./types";

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

export function userLogin(url, payload, history) {
  return function (dispatch) {
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: payload }),
    })
      .then((res) => {
        console.log(res);
        if (res.status === 200 && res.statusText === "OK") {
          history.push("/");
          return res.json();
        }
      })
      .then((user) => {
        console.log(user);
        user && localStorage.setItem("authToken", user.token);
        dispatch({ type: USER, payload: { ...user } });
      });
  };
}

export function allTags(payload) {
  return {
    type: ALL_TAGS,
    payload,
  };
}
