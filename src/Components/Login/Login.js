import React, { Component } from 'react';
import './Login.css';

export default class LogIn extends Component {
      constructor(props) {
            super(props);
            this.state = {
            }
      }

      render() {
            return (
                  <div id="login-page-container">
                        <div className="login-container">
                              <h2>Log In</h2>
                              <form>
                                    <input type="text" name="username" required placeholder="Enter your username"></input> <br/>
                                    <input type="password" name="password" required placeholder="Enter your password"></input> <br/>
                                    <button type="submit" id="login-button">Log in</button>
                              </form>
                        </div>
                  </div>
                              )
                        }
                  }
