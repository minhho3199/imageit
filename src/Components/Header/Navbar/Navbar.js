import React, { Component } from 'react';
import './Navbar.css';
class Navbar extends Component {
      constructor(props) {
            super(props);
            this.state = {}
      }
      render() {
            return (
                  <div id="navbar">
                        <a className="nav-link">Login</a>
                        <a className="nav-link">Signup</a>
                  </div>
            );
      }
}

export default Navbar;