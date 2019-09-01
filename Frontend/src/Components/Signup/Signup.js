import React, { Component } from 'react';
import './Signup.css';
import axios from 'axios';

export default class SignUp extends Component {
      constructor(props) {
            super(props);
            this.handleNameChange = this.handleNameChange.bind(this);
            this.handleEmailChange = this.handleEmailChange.bind(this);
            this.handlePasswordChange = this.handlePasswordChange.bind(this);
            this.handlePassword2Change = this.handlePassword2Change.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
            this.state = {
                  name: "",
                  email: "",
                  password: "",
                  password2: "",
                  redirectToLogin: false

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
      }

      handlePassword2Change(e) {
            this.setState({
                  password2: e.target.value
            })
      }

      handleSubmit(e) {
            e.preventDefault();
            const { password, password2 } = this.state;
            if (password.length < 8) {
                  alert("Password must be at least 8 characters");
            }
            else if (password !== password2) {
                  alert("Passwords don't match");
            } else {
                  axios.post("http://localhost:5000/api/users/register", {
                        name: this.state.name,
                        email: this.state.email,
                        password: this.state.password,
                  })
                        .then(data => console.log(data))
                        .catch(err => console.log(err))
            }

      }

      render() {
            return (
                  <div id="signup-page-container">
                        <div className="signup-container">
                              <h2>Sign Up</h2>
                              <form onSubmit={this.handleSubmit}>
                                    <input type="text" required placeholder="Enter your name" onChange={this.handleNameChange}></input> <br />
                                    <input type="email" required placeholder="Enter your email" onChange={this.handleEmailChange}></input> <br />
                                    <input type="password" required placeholder="Enter your password" onChange={this.handlePasswordChange}></input> <br />
                                    <input type="password" required placeholder="Reenter your password" onChange={this.handlePassword2Change}></input> <br />
                                    <button type="submit" id="signup-button">Sign Up</button>
                              </form>
                        </div>
                  </div>
            )
      }
}

