import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import uuid from "react-uuid";
import { connect } from "react-redux";
import { MY_ARTICLES } from "../store/types";

class FilterArticles extends Component {
  componentDidMount() {
    const { username } = this.props.user;
    let url = `https://conduit.productionready.io/api/articles?author=${username}&limit=5&offset=0`;
    fetch(url, {
      method: "GET",
      headers: { "content-type": "application/json" },
      authorization: `Token ${localStorage.authToken}`,
    })
      .then((res) => res.json())
      .then(({ articles }) => {
        this.props.dispatch({ type: MY_ARTICLES, payload: articles });
        return this.props.history.push(`/profile/${username}`);
      });
  }

  handleFilter(activeTab) {
    const { username } = this.props.user;
    let articleUrl = `https://conduit.productionready.io/api/articles?author=${username}&limit=5&offset=0`;
    let favoriteUrl = `https://conduit.productionready.io/api/articles?favorited=${username}&limit=5&offset=0`;
    switch (activeTab) {
      case "myArticles":
        return fetch(articleUrl, {
          method: "GET",
          headers: { "content-type": "application/json" },
          authorization: `Token ${localStorage.authToken}`,
        })
          .then((res) => res.json())
          .then(({ articles }) => {
            this.props.dispatch({ type: MY_ARTICLES, payload: articles });
            return this.props.history.push(`/profile/${username}`);
          });
      case "favoriteArticles":
        return fetch(favoriteUrl, {
          method: "GET",
          headers: { "content-type": "application/json" },
          authorization: `Token ${localStorage.authToken}`,
        })
          .then((res) => res.json())
          .then(({ articles }) => {
            this.props.dispatch({ type: MY_ARTICLES, payload: articles });
            return this.props.history.push(`/profile/${username}`);
          });
      default:
        return activeTab;
    }
  }

  render() {
    const { myArticles } = this.props;
    return (
      <>
        <div className="mobile-app-toggle" data-mobile-app-toggle>
          <button
            className="button is-active"
            onClick={() => this.handleFilter("myArticles")}
          >
            My Articles
          </button>
          <button
            className="button"
            onClick={() => this.handleFilter("favoriteArticles")}
          >
            Favorite Articles
          </button>
        </div>
        {!myArticles ? (
          <h1>Click on button to get articles</h1>
        ) : (
          myArticles.map((article) => {
            return (
              <div className="articles-container flex-basis" key={uuid()}>
                <div className="card news-card">
                  <img
                    src={`https://source.unsplash.com/collection/{${Math.floor(
                      Math.random() * 100
                    )}/1600x900`}
                    alt={article.author.username}
                  />
                  <div className="card-section">
                    <div className="news-card-date">
                      {article.updatedAt.split("T")[0]}
                    </div>
                    <article className="news-card-article">
                      <h4 className="news-card-title">
                        <Link to={`/articles/${article.slug}`}>
                          {article.title}
                        </Link>
                      </h4>
                      <p className="news-card-description">
                        {article.description}
                      </p>
                    </article>
                    {article.favorited ? (
                      <button
                        className="button button-like like-btn"
                        onClick={this.handleLike}
                      >
                        <i className="fa fa-heart"></i>
                        <span> UnLike</span>
                      </button>
                    ) : (
                      <button
                        className="button button-like"
                        onClick={this.handleLike}
                      >
                        <i className="fa fa-heart"></i>
                        <span> Like</span>
                      </button>
                    )}

                    <div className="news-card-author">
                      <div className="news-card-author-image">
                        <img
                          src={article.author.image}
                          className="article-image"
                          alt="user"
                        />
                      </div>
                      <div className="news-card-author-name">
                        By{" "}
                        <Link to={`/profiles/${article.author.username}`}>
                          {article.author.username}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </>
    );
  }
}

function mapState(state) {
  return { ...state };
}

export default connect(mapState)(withRouter(FilterArticles));
