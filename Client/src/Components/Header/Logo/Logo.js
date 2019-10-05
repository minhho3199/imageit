import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Logo.css'

export default class Logo extends Component {

  render() {
    return (
      <div id="logo">
        <Link to="/home" id="home-link"><h2 id="logo-title">ImageIt</h2></Link>
      </div>
    );
  };
}


