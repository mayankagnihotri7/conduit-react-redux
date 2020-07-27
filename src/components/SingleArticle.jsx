import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { singleArticle } from "../store/actions";
import Comment from "./Comment";

class SingleArticle extends Component {
  componentDidMount() {
    const slug = this.props.match.params.slug;
    const url = `https://conduit.productionready.io/api/articles/${slug}`;
    this.props.dispatch(singleArticle(url));
  }

  handleDelete = () => {
    const slug = this.props.match.params.slug;
    const url = `https://conduit.productionready.io/api/articles/${slug}`;
    fetch(url, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        authorization: `Token ${localStorage.authToken}`,
      },
    }).then((res) => {
      if (res.status === 200) {
        return this.props.history.push("/");
      }
    });
  };

  render() {
    const { article } = this.props;
    const { user } = this.props;
    if (!article) {
      return <h1 className="text-centre">Loading...</h1>;
    }
    return (
      <div className="articles-container">
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
                <Link to={`articles/${article.slug}`}>{article.title}</Link>
              </h4>
              <p className="news-card-description">{article.description}</p>
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
                  alt={article.author.username}
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
        {article.author.username === user.username ? (
          <>
            <button className="card-user-profile-button button hollow secondary">
              <Link to={`/editArticle/${article.slug}`}>Edit article</Link>
            </button>
            <button
              className="card-user-profile-button button hollow secondary"
              onClick={this.handleDelete}
            >
              Delete
            </button>
          </>
        ) : (
          ""
        )}
        <Comment />
      </div>
    );
  }
}

function mapState(state) {
  return { ...state };
}

export default connect(mapState)(SingleArticle);
