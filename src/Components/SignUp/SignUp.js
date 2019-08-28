import React, { Component } from 'react';
import './Signup.css';

export default class SignUp extends Component {
      constructor(props) {
            super(props);
            this.state = {
            }
      }

      render() {
            return (
                  <div id="signup-page-container">
                        <div className="signup-container">
                              <h2>Sign Up</h2>
                              <form>
                                    <input type="text" required placeholder="Enter your name"></input> <br/>
                                    <input type="text" required placeholder="Enter your email"></input> <br/>
                                    <input type="password" required placeholder="Enter your password"></input> <br/>
                                    <input type="password" required placeholder="Reenter your password"></input> <br/>
                                    <button type="submit" id="signup-button">Sign Up</button>
                              </form>
                        </div>
                  </div>
                              )
                        }
                  }

