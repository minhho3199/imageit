import React, { Component } from 'react';
import './Logo.css'
import Navbar from '../Navbar/Navbar';
import LogIn from '../../LogIn/LogIn';
class Logo extends Component {
  render() {
    return (
      <div id="nav-container">
        <div id="logo">
          <h2 id="logo-title">ImageIt</h2>
        </div>
        <Navbar></Navbar>
      </div>

    );
  };
}

export default Logo;
