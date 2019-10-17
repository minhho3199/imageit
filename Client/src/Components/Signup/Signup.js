import React, { Component } from 'react';
import './Signup.css';
import Navbar from '../Header/Navbar/Navbar'
import axios from 'axios';

export default class Signup extends Component {
      constructor(props) {
            super(props);
            this.handleNameChange = this.handleNameChange.bind(this);
            this.handleEmailChange = this.handleEmailChange.bind(this);
            this.handlePasswordChange = this.handlePasswordChange.bind(this);
            this.handlePassword2Change = this.handlePassword2Change.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
            this.checkPassword = this.checkPassword.bind(this);
            this.state = {
                  name: "",
                  email: "",
                  password: "",
                  password2: "",
                  passLength: "",
                  passMatch: "",
            }
      }
      //This code is the one used prior to check and mantain password integrity.
      checkPassword() {
            const { password } = this.state;
            if (password.length < 5) {
                  this.setState({
                        passLength: "Password must be at least 6 characters",
                  })
            } else if (password.length > 5 || password.length === 5) {
                  this.setState({
                        passLength: "",
                  })
            }
      }
      componentDidMount() {
            if("usertoken" in localStorage) {
                  this.props.history.push("/home");
            }
      }
      handleNameChange(e) {
            this.setState({
                  name: e.target.value
            })
      }

      handleEmailChange(e) {
            this.setState({
                  email: e.target.value
            })
      }

      handlePasswordChange(e) {
            this.setState({
                  password: e.target.value
            })
            this.checkPassword();
      }

      handlePassword2Change(e) {
            this.setState({
                  password2: e.target.value
            })
      }

//This code overall works similar to the Login, however this is where the user intially creates all Data and what is stored/exnrypted onto the Database. To access it the user must choose the same username and password to be allowed entry and bypass the login system.
      handleSubmit(e) {
            const { password, password2 } = this.state;
            e.preventDefault();
            if (password !== password2) {
                  this.setState({
                        passMatch: "Passwords must match",
                  });
            } else if (password === password2 && this.state.passLength === "") {
                  this.setState({
                        passMatch: "",
                  });
                  axios.post("/api/users/register", {
                        name: this.state.name,
                        email: this.state.email,
                        password: this.state.password,
                  })
                        .then(data => {
                              if (data.status === 200) {
                                    this.props.history.push("/login");
                              }
                        })
                        .catch(err => {
                              console.log(err);
                              alert("Register unsuccessful");
                        })
            }

      }

      render() {
            return (
                  <div>
                        <Navbar />
                        <div id="signup-page-container">
                              <div className="signup-container">
                                    <h2>Sign Up</h2>
                                    <form action="/register" method="POST" multipart="urlencoded" onSubmit={this.handleSubmit}>
                                          <input type="text" required placeholder="Enter your name" onChange={this.handleNameChange}></input> <br />
                                          <input type="email" required placeholder="Enter your email" onChange={this.handleEmailChange}></input> <br />
                                          <input type="password" required placeholder="Enter your password" onChange={this.handlePasswordChange}></input> <br />
                                          <span className="error-text">{this.state.passLength}</span>
                                          <input type="password" required placeholder="Reenter your password" onChange={this.handlePassword2Change}></input> <br />
                                          <span className="error-text">{this.state.passMatch}</span> <br />
                                          <button type="submit" id="signup-button">Sign Up</button>
                                    </form>
                              </div>
                        </div>
                  </div>
            )
      }
}

