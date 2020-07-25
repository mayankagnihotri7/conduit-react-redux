import React, { Component } from "react";
import { Link } from "react-router-dom";

class SingleArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article: "",
    };
  }

  componentDidMount() {
    const slug = this.props.match.params.slug;
    const url = `https://conduit.productionready.io/api/articles/${slug}`;
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${localStorage.authToken}`,
      },
    })
      .then((res) => res.json())
      .then(({ article }) => this.setState({ article }));
  }

  render() {
    const { article } = this.state;
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
        <button className="card-user-profile-button button hollow secondary">
          <Link to="/editProfile">Edit article</Link>
        </button>
      </div>
    );
  }
}

export default SingleArticle;
