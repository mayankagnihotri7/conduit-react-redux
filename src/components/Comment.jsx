import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchComments } from "../store/actions";
import uuid from "react-uuid";
import { Link, withRouter } from "react-router-dom";
import CommentInput from "./CommentInput";

class Comment extends Component {
  componentDidMount() {
    let { slug } = this.props.article;
    let url = `https://conduit.productionready.io/api/articles/${slug}/comments`;
    this.props.dispatch(fetchComments(url));
  }

  handleDelete = (commentId) => {
    const { slug } = this.props.article;
    let url = `https://conduit.productionready.io/api/articles/${slug}/comments/${commentId}`;
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
    const { comments, user } = this.props;
    return (
      <div className="comment-section-container">
        <CommentInput />
        <h3>Comments</h3>
        {comments.map((comment) => {
          return (
            <div key={uuid()}>
              <div className="comment-section-author">
                <img
                  src={comment.author.image}
                  alt={comment.author.username}
                  className="article-image"
                />
                <div className="comment-section-name">
                  <h5>
                    <Link to={`/profiles/${comment.author.username}`}>
                      {comment.author.username}
                    </Link>
                  </h5>
                  <p>{comment.updatedAt.split("T")[0]}</p>
                </div>
              </div>
              <div className="comment-section-text">
                <p>{comment.body}</p>
              </div>
              {comment.author.username === user.username ? (
                <button
                  className="button secondary small"
                  onClick={() => this.handleDelete(comment.id)}
                >
                  Delete
                </button>
              ) : (
                ""
              )}
            </div>
          );
        })}
      </div>
    );
  }
}

function mapState(state) {
  return { ...state };
}

export default connect(mapState)(withRouter(Comment));
