import React, { Component } from "react";
import { NavLink } from "react-router-dom";

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
                <h1>Conduit</h1>
              </div>
              <div className="top-bar-right">
                <ul className="menu">
                  <li>
                    <NavLink to="/">Home</NavLink>
                  </li>
                  <li>
                    <NavLink to="/login">Login</NavLink>
                  </li>
                  <li>
                    <NavLink to="/register">Sign Up</NavLink>
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
