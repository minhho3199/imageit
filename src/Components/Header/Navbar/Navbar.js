import React, { Component } from 'react';
import { Link } from "react-router-dom"
import './Navbar.css';

class Navbar extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div id="navbar">
        <Link to="/login"><button id="log-in-button">Login</button></Link>
        <Link to="/signup"><button id="sign-up-button">Signup</button></Link>
      </div>
    );
  }
}

export default Navbar;
