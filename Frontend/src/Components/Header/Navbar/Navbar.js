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
    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.logOut = this.logOut.bind(this);
    this.state = {
      name: '',
      showMenu: false,
      _isMounted: false
    }
  }

  logOut(e) {
    e.preventDefault();
    localStorage.removeItem('usertoken');
    this.setState({
      name: "",
    }, () => {
      this.props.history.push("/");
    })
  }

  componentDidMount() {
    
    const token = localStorage.usertoken;
    if (token) {
      const decoded = jwt_decode(token);
      this.setState({
        name: decoded.name,
      })
    }
  }
  
  showMenu(e) {
    e.preventDefault();
    this.setState({
      showMenu: true
    }, () => {
      document.addEventListener('click', this.closeMenu);
    })
  }

  closeMenu() {
    this.setState({ showMenu: false }, () => {
      document.removeEventListener('click', this.closeMenu);
    });
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
        <DropdownButton id="dropdown-basic-button " className="dropdown-button" title={this.state.name + " "} onClick={this.showMenu}>
          {this.state.showMenu ? (
            <div>
              <Dropdown.Item href="#/action-1" id="dropdown-items"><FontAwesomeIcon icon={faUser} />&nbsp;&nbsp; My Profile</Dropdown.Item>
              <Dropdown.Item onClick={this.logOut} id="dropdown-items"><FontAwesomeIcon icon={faSignOutAlt} />&nbsp;&nbsp; Logout</Dropdown.Item>
            </div>
          ) : (null)}
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

