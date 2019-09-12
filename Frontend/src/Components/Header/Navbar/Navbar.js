import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom"
import './Navbar.css';
import jwt_decode from 'jwt-decode';
import Logo from '../Logo/Logo'
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


  render() {
    const loginRegLink = (
      <div id="navbar">
        <Link to="/login" className="button-link"><button className="login-register-button">Login</button></Link>
        <Link to="/signup" className="button-link"><button className="login-register-button">Signup</button></Link>
      </div>
    )
    const userLink = (
      <div id="navbar">
        <button className="login-register-button">{this.state.name}</button>
        <button className="login-register-button button-link" onClick={this.logOut}>Logout</button>
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

