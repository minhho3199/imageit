import React, { Component } from 'react';
import { Route, Link} from "react-router-dom"
import './LogIn.css';
import Navbar from "../Header/Navbar/Navbar";

export default class LogIn extends Component {
      constructor(props) {
            super(props);
            this.state = {
            }
      }

      render() {
            return (
                  <div>
                        <div className="login-container">
                        <input type="text" placeholder="Username" id="username"></input>
                        <input type="text" placeholder="Password" id="password"></input>
                              </div>
                        </div>
            )
      }
}
