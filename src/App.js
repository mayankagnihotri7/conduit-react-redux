import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchArticle } from "./store/actions";
import uuid from "react-uuid";
import Tags from "./Tags";

class App extends Component {
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
              <h2>{article.title}</h2>;
              <p>{article.description}</p>
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

export default connect(mapState)(App);
