import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom"
import jwt_decode from 'jwt-decode';
import Logo from '../Logo/Logo'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.state = {
      name: '',
    }
  }

  logOut(e) {
    e.preventDefault();
    localStorage.removeItem('usertoken');
    localStorage.removeItem('setTime');
    this.setState({
      name: "",
    }, () => {
      this.props.history.push("/");
    })
  }

  //Add a setTime to localstorage for 1 hour. After 1 hour has passed, the user is logged out automatically.
  componentDidMount() {
    const token = localStorage.usertoken;
    var hours = 1;
    var now = new Date().getTime();
    const setTime = localStorage.setTime;
    if (token && setTime) {
      if (now - setTime > hours * 60 * 60 * 1000) {
        localStorage.removeItem('usertoken');
        localStorage.removeItem('setTime');
        this.setState({
          name: '',
        })
      } else {
        const decoded = jwt_decode(token);
        this.setState({
          name: decoded.name,
        })
      }
    }
  }

  render() {
    const loginRegLink = (
      <div id="navbar-before">
        <Link to="/login" className="button-link"><button className="login-register-button">Login</button></Link>
        <Link to="/signup" className="button-link"><button className="login-register-button">Signup</button></Link>
      </div>
    )
    const userLink = (
      <div id="navbar-after">
        <DropdownButton id="dropdown-basic-button " className="dropdown-button" title={this.state.name + " "}>
          <Dropdown.Item as="button" onClick={this.logOut} id="dropdown-items"><FontAwesomeIcon icon={faSignOutAlt} />&nbsp;&nbsp; Logout</Dropdown.Item>
        </DropdownButton>
      </div>
    )
    return (
      <div id="nav-container">
        <Logo></Logo>
        {localStorage.usertoken ? userLink : loginRegLink}
      </div>
    );
  }
}

export default withRouter(Navbar)

