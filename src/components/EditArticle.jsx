import React, { Component } from "react";
import { connect } from "react-redux";
import { singleArticle } from "../store/actions";
import { ARTICLE } from "../store/types";

class EditArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      body: "",
      description: "",
      tagList: "",
    };
  }

  componentDidMount() {
    const { slug } = this.props.match.params;
    let url = `https://conduit.productionready.io/api/articles/${slug}`;
    this.props.dispatch(singleArticle(url));
    const { title, description, body, tagList } = this.props.state.article;
    this.setState({ title, description, body, tagList });
  }

  handleInput = ({ target: { name, value } }) => {
    if (name === "tagList") {
      value = value.split(",").map((tag) => tag.trim());
      this.setState({ [name]: value });
    } else {
      this.setState({ [name]: value });
    }
  };

  componentDidUpdate() {
    if (this.props.state.article && !this.state.title) {
      const { title, description, body, tagList } = this.props.state.article;
      return this.setState({ title, description, body, tagList });
    }
  }

  handleSubmit = () => {
    const { slug } = this.props.match.params;
    let url = `https://conduit.productionready.io/api/articles/${slug}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: `Token ${localStorage.authToken}`,
      },
      body: JSON.stringify({ article: this.state }),
    })
      .then((res) => {
        if (res.status === 200) {
          this.props.history.push(`/articles/${slug}`);
          return res.json();
        }
      })
      .then((article) =>
        this.props.dispatch({ type: ARTICLE, payload: article })
      );
  };

  render() {
    const { title, description, body, tagList } = this.state;
    return (
      <div className="articles-container">
        <div className="row">
          <div className="small-12 column">
            <div className="form-floating-label">
              <input
                type="text"
                name="title"
                value={title}
                onChange={this.handleInput}
              />
              <label htmlFor="tel">Title</label>
            </div>
          </div>
          <div className="small-12 column">
            <div className="form-floating-label">
              <input
                type="text"
                name="body"
                value={body}
                onChange={this.handleInput}
              />
              <label htmlFor="email">Body</label>
            </div>
          </div>
          <div className="small-12 column">
            <div className="form-floating-label">
              <input
                type="text"
                id="tags"
                name="tagList"
                value={tagList}
                onChange={this.handleInput}
              />
              <label htmlFor="username">Tags</label>
            </div>
          </div>
          <div className="small-12 column">
            <div className="form-floating-label">
              <textarea
                name="description"
                id=""
                rows="5"
                placeholder=""
                value={description}
                onChange={this.handleInput}
              ></textarea>
              <label htmlFor="textarea">Description</label>
            </div>
          </div>
        </div>
        <button className="button expanded" onClick={this.handleSubmit}>
          Create
        </button>
      </div>
    );
  }
}

function mapState(state) {
  return { state };
}

export default connect(mapState)(EditArticle);
