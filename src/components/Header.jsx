import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";

class Header extends Component {
  render() {
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

export default Header;
