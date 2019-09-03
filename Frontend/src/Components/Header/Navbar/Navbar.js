import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom"
import './Navbar.css';
import jwt_decode from 'jwt-decode';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.state = {
      name: ""
    }
  }

  logOut(e) {
    e.preventDefault();
    localStorage.removeItem('usertoken');
    this.props.history.push("/");
  }

  componentDidMount() {
    const token = localStorage.usertoken;
    if (token) {
      const decoded = jwt_decode(token);
      this.setState({
        name: decoded.name
      })
    }
  }
  render() {
    const loginRegLink = (
      <div>
        <Link to="/login"><button className="login-register-button">Login</button></Link>
        <Link to="/signup"><button className="login-register-button">Signup</button></Link>
      </div>
    )
    const userLink = (
      <div>
        <button className="login-register-button">{this.state.name}</button>
        {/* <p>{this.state.name}</p> */}
        <button className="login-register-button" onClick={this.logOut}>Logout</button>
      </div>
    )
    return (
      <div id="navbar">
        {localStorage.usertoken ? userLink : loginRegLink}
      </div>
    );
  }
}

export default withRouter(Navbar)

