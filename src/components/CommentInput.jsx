import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class CommentInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      body: "",
    };
  }

  handleInput = (event) => {
    this.setState({ body: event.target.value });
  };

  handleComment = () => {
    let { slug } = this.props.article;
    let url = `https://conduit.productionready.io/api/articles/${slug}/comments`;
    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Token ${localStorage.authToken}`,
      },
      body: JSON.stringify({ comment: { body: this.state.body } }),
    })
      .then((res) => {
        if (res.status === 200) {
          this.setState({ body: "" });
          return res.json();
        }
      })
      .then(({ comment }) => {
        if (comment) {
          return this.props.history.push(`articles/${slug}`);
        }
      });
  };

  render() {
    return (
      <div className="form-floating-label">
        <textarea
          name="description"
          id=""
          rows="3"
          placeholder=""
          value={this.state.body}
          onChange={this.handleInput}
        ></textarea>
        <label htmlFor="textarea">Comment here...</label>
        <button
          className="card-user-profile-button button hollow secondary"
          onClick={this.handleComment}
        >
          Comment
        </button>
      </div>
    );
  }
}

function mapState(state) {
  return { ...state };
}

export default connect(mapState)(withRouter(CommentInput));
