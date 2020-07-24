import React, { Component } from "react";
import { connect } from "react-redux";
import { userLogin } from "../store/actions";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  handleInput = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    let url = "https://conduit.productionready.io/api/users/login";
    this.props.dispatch(userLogin(url, { ...this.state }, this.props.history));
  };

  render() {
    return (
      <div className="contact-panel container" id="contact-panel">
        <h2 className="contact-panel-button">Login</h2>
        <div>
          <div className="row">
            <label>
              User name *
              <input
                type="email"
                placeholder="Enter Email"
                name="email"
                value={this.state.email}
                onChange={this.handleInput}
              />
            </label>
          </div>
          <div className="row">
            <label>
              Email *
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={this.state.password}
                onChange={this.handleInput}
              />
            </label>
          </div>
          <div className="contact-panel-actions">
            <input
              type="submit"
              className="button submit-button"
              onClick={this.handleSubmit}
              value="Submit"
            />
          </div>
        </div>
      </div>
    );
  }
}

function mapState(state) {
  return { state };
}

export default connect(mapState)(Login);
