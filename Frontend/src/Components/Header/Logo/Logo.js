import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './Logo.css'
import Navbar from '../Navbar/Navbar';

export default class Logo extends Component {
  render() {
    return (
      <div id="nav-container">
        <div id="logo">
          <Link to="/" id="home-link"><h2 id="logo-title">ImageIt</h2></Link>
        </div>
        <Navbar></Navbar>
      </div>
    );
  };
}


