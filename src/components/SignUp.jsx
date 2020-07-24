import React, { Component } from "react";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
    };
  }

  handleInput = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    let url = "https://conduit.productionready.io/api/users";
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: this.state }),
    }).then((res) => {
      if (res.status === 200) {
        this.props.history.push("/login");
      }
    });
  };

  render() {
    return (
      <div className="callout primary container">
        <div className="form-icons">
          <h4>Register for an account</h4>

          <div className="input-group">
            <span className="input-group-label">
              <i className="fa fa-user"></i>
            </span>
            <input
              className="input-group-field"
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleInput}
              placeholder="Enter Username"
            />
          </div>

          <div className="input-group">
            <span className="input-group-label">
              <i className="fa fa-envelope"></i>
            </span>
            <input
              className="input-group-field"
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleInput}
              placeholder="Email"
            />
          </div>

          <div className="input-group">
            <span className="input-group-label">
              <i className="fa fa-key"></i>
            </span>
            <input
              className="input-group-field"
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleInput}
              placeholder="Password"
            />
          </div>
        </div>

        <button className="button expanded" onClick={this.handleSubmit}>
          Sign Up
        </button>
      </div>
    );
  }
}

export default SignUp;
