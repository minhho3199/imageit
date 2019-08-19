import React, { Component } from 'react';
import { Route, Link } from "react-router-dom"
import './Navbar.css';
import LogIn from "../../LogIn/LogIn";
import SignUp from "../../SignUp/SignUp";
class Navbar extends Component {
      constructor(props) {
            super(props);
            this.handleLogInButton = this.handleLogInButton.bind(this);
            this.handleSignUpButton = this.handleSignUpButton.bind(this);
            this.state = {
                   LogInPressed: false,
                   SignUpPressed: false,
            }
      }

      handleLogInButton() {
        this.setState({
                  LogInPressed: true,
        })
      }

      handleSignUpButton() {
        this.setState({
                 SignUpPressed: true,
        })
      }

      render() {
        let LogInPressed = this.state.LogInPressed;
         LogInButton = <LogInButton onClick={this.handleLogInButton} />
        if (LogInPressed) {
          return (
             <Route to="/login" component={LogIn}></Route>
            )
        }
        let SignUpPressed = this.state.SignUpPressed;
         SignUpButton = <SignUpButton onClick={this.handleSignUpButton} />
        if (SignUpPressed) {
          return (
            <Route to="/signup" component={SignUp}></Route>
          )
        }
        return (
                  <div id="navbar">
                        <Link to="/login">{LogInButton}</Link>
                        <Link to="/signup">{SignUpButton}</Link>
                  </div>
            );
      }
}
function LogInButton(props) {
  return (
    <button onClick={props.onClick} id="log-in-button">Login</button>
  )
}
function SignUpButton(props) {
  return (
    <button onClick={props.onClick} id="sign-up-button">Signup</button>
  )
}

export default Navbar;
