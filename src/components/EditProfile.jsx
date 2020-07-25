import React, { Component } from "react";
import { connect } from "react-redux";
import { USER } from "../store/types";

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bio: "",
      email: "",
      image: "",
      username: "",
    };
  }

  handleInput = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.user && !this.state.username) {
      let { image, username, bio, email } = this.props.user;
      return this.setState({ bio, image, username, email });
    }
  }

  handleSubmit = () => {
    let url = "https://conduit.productionready.io/api/user";
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${localStorage.authToken}`,
      },
      body: JSON.stringify({ user: this.state }),
    })
      .then((res) => {
        if (res.status === 200) {
          this.props.history.push("/");
          return res.json();
        }
      })
      .then(({ user }) => {
        this.props.dispatch({ type: USER, payload: { ...user } });
      });
  };

  render() {
    let { image, bio, username, email } = this.state;
    return (
      <div className="articles-container">
        <div className="row">
          <div className="small-12 column">
            <div className="form-floating-label">
              <input
                type="text"
                name="image"
                value={image}
                onChange={this.handleInput}
              />
              <label htmlFor="tel">Image</label>
            </div>
          </div>
          <div className="small-12 column">
            <div className="form-floating-label">
              <input
                type="email"
                name="email"
                value={email}
                onChange={this.handleInput}
              />
              <label htmlFor="email">Email</label>
            </div>
          </div>
          <div className="small-12 column">
            <div className="form-floating-label">
              <input
                type="text"
                id="email"
                name="username"
                value={username}
                onChange={this.handleInput}
              />
              <label htmlFor="username">Username</label>
            </div>
          </div>
          <div className="small-12 column">
            <div className="form-floating-label">
              <textarea
                name="bio"
                id=""
                rows="5"
                placeholder=""
                value={bio}
                onChange={this.handleInput}
              ></textarea>
              <label htmlFor="textarea">Bio</label>
            </div>
          </div>
        </div>
        <button className="button expanded" onClick={this.handleSubmit}>
          Save
        </button>
      </div>
    );
  }
}

function mapState(state) {
  return { ...state };
}

export default connect(mapState)(EditProfile);
