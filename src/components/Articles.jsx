import React, { Component } from "react";
import { fetchArticle } from "../store/actions";
import uuid from "react-uuid";
import { connect } from "react-redux";
import Tags from "./Tags";

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
      <div>
        {articles.map((article) => {
          return (
            <li key={uuid()}>
              <h4>{article.author.username}</h4>
              <h5>{article.updatedAt.split("T")[0]}</h5>
              <h4>{article.favoritesCount}</h4>
              <img src={article.author.image} alt={article.author.username} />
              <h2>{article.title}</h2>;<p>{article.description}</p>
              {article.tagList.map((tags) => (
                <h4 key={uuid()}>{tags}</h4>
              ))}
            </li>
          );
        })}
        <Tags />
      </div>
    );
  }
}

function mapState({ articles }) {
  return { articles };
}

export default connect(mapState)(Articles);
