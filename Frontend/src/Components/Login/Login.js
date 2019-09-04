import React, { Component } from 'react';
import axios from 'axios';
import './Login.css';
import Navbar from '../Header/Navbar/Navbar'
class Login extends Component {
      constructor(props) {
            super(props);
            this.handleEmailChange = this.handleEmailChange.bind(this);
            this.handlePasswordChange = this.handlePasswordChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
            this.state = {
                  email: '',
                  password: '',
            }
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

      handleSubmit(e) {
            e.preventDefault();
            axios.post("http://localhost:5000/api/users/login", {
                  email: this.state.email,
                  password: this.state.password,
            })
                  .then(res => {
                        localStorage.setItem('usertoken', res.data);
                  })
                  .then(() => {
                        this.props.history.push('/home');
                  })
                  .catch(err => console.log(err))
      }

      render() {
            return (
                  <div>
                        <Navbar />
                        <div id="login-page-container">
                              <div className="login-container">
                                    <h2>Log In</h2>
                                    <form onSubmit={this.handleSubmit}>
                                          <input type="email" name="email" required placeholder="Enter your email" onChange={this.handleEmailChange}></input> <br />
                                          <input type="password" name="password" required placeholder="Enter your password" onChange={this.handlePasswordChange}></input> <br />
                                          <button type="submit" id="login-button">Log in</button>
                                    </form>
                              </div>
                        </div>
                  </div>
            )
      }
}
export default Login;