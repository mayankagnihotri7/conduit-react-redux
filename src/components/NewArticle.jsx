import React, { Component } from "react";
import { connect } from "react-redux";
import { addArticle } from "../store/actions";

class NewArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      body: "",
      tagList: "",
    };
  }

  handleInput = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    let url = "https://conduit.productionready.io/api/articles";
    this.props.dispatch(addArticle(url, { ...this.state }, this.props.history));
  };

  render() {
    let { title, description, body, tagList } = this.state;
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

export default connect(mapState)(NewArticle);
