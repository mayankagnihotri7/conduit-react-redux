import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { VISIT_USER } from "../store/types";

class UserProfile extends Component {
  componentDidMount() {
    let slug = this.props.match.params.slug;
    let url = `https://conduit.productionready.io/api/profiles/${slug}`;
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${localStorage.authToken}`,
      },
    })
      .then((res) => res.json())
      .then(({ profile }) => {
        return this.props.dispatch({ type: VISIT_USER, payload: profile });
      });
  }

  handleFollow = (following, username) => {
    let slug = this.props.match.params.slug;
    let url = `https://conduit.productionready.io/api/profiles/${slug}/follow`;
    let method = following ? "DELETE" : "POST";
    fetch(url, {
      method,
      headers: {
        "content-type": "application/json",
        authorization: `Token ${localStorage.authToken}`,
      },
    })
      .then((res) => res.json())
      .then(({ profile }) => {
        this.props.dispatch({ type: VISIT_USER, payload: profile });
        this.props.history.push(`/profile/${username}`);
      });
  };

  render() {
    let { username, image, bio, following } = this.props.visitUser;
    return (
      <div className="card-user-profile articles-container">
        <img
          className="card-user-profile-img"
          src="https://source.unsplash.com/random/650x500"
          alt={username}
        />
        <div className="card-user-profile-content card-section">
          <div className="card-user-profile-avatar">
            <img src={image} alt={username} />
          </div>
          <p className="card-user-profile-name">{username}</p>
          <p className="card-user-profile-status">{bio}</p>
          <p className="card-user-profile-info">
            The Yeti, once better known as the Abominable Snowman, is a
            mysterious bipedal creature said to live in the mountains of Asia.
            It sometimes leaves tracks in snow, but is also said to dwell below
            the Himalayan snow line.
          </p>
        </div>

        <div className="card-user-profile-actions">
          {following ? (
            <button
              className="card-user-profile-button button hollow"
              onClick={() => this.handleFollow(following, username)}
            >
              Unfollow
            </button>
          ) : (
            <button
              className="card-user-profile-button button hollow"
              onClick={() => this.handleFollow(following, username)}
            >
              Follow
            </button>
          )}
          {}
          <button className="card-user-profile-button button hollow secondary">
            <Link to="/editProfile">Edit Profile</Link>
          </button>
        </div>
      </div>
    );
  }
}

function mapState(state) {
  return { ...state };
}

export default connect(mapState)(UserProfile);
