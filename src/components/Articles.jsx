import React, { Component } from "react";
import { fetchArticle } from "../store/actions";
import uuid from "react-uuid";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Articles extends Component {
  componentDidMount() {
    this.props.dispatch(
      fetchArticle(
        "https://conduit.productionready.io/api/articles?limit=20&offset=0"
      )
    );
  }

  render() {
    const { articles } = this.props;

    return (
      <div className="flex">
        {articles.map((article) => {
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
                      <Link to="/">{article.title}</Link>
                    </h4>
                    <p className="news-card-description">
                      {article.description}
                    </p>
                  </article>
                  <button className="button button-like">
                    <i className="fa fa-heart"></i>
                    <span> Like</span>
                  </button>

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
                      <Link to={`/profile/${article.author.username}`}>
                        {article.author.username}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

function mapState({ articles }) {
  return { articles };
}

export default connect(mapState)(Articles);
