import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import { connect } from "react-redux";
import { USER } from "../store/types";

class Header extends Component {
  componentDidMount() {
    if (localStorage.authToken) {
      let url = "https://conduit.productionready.io/api/user";
      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Token ${localStorage.authToken}`,
        },
      })
        .then((res) => res.json())
        .then(({ user }) => this.props.dispatch({ type: USER, payload: user }));
    }
  }

  // manky@manky.com
  render() {
    const { user } = this.props;
    return (
      <>
        <header id="header" className="topbar-sticky-shrink-header"></header>

        <div data-sticky-container>
          <div
            data-sticky
            data-margin-top="0"
            data-top-anchor="header:bottom"
            data-btm-anchor="content:bottom"
          >
            <div className="top-bar topbar-sticky-shrink">
              <div className="top-bar-title">
                <Link className="logo" to="/">
                  Conduit
                </Link>
              </div>
              <div className="top-bar-right">
                <ul className="menu">
                  {user && user.token ? (
                    <>
                      <li>
                        <NavLink activeClassName="active" to="/" exact>
                          Home
                        </NavLink>
                      </li>
                      <li>
                        <NavLink activeClassName="active" to="/newArticle">
                          Create Post
                        </NavLink>
                      </li>
                      <li>
                        <NavLink activeClassName="active" to={`/profile`}>
                          {user.username}
                        </NavLink>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <NavLink activeClassName="active" to="/" exact>
                          Home
                        </NavLink>
                      </li>
                      <li>
                        <NavLink activeClassName="active" to="/login">
                          Login
                        </NavLink>
                      </li>
                      <li>
                        <NavLink activeClassName="active" to="/register">
                          Sign Up
                        </NavLink>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <br />
      </>
    );
  }
}

function mapState(state) {
  if (localStorage.authToken) {
    return { ...state };
  }
}

export default connect(mapState)(Header);
