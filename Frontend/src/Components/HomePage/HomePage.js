import React, { Component } from 'react';
import { Link } from "react-router-dom"
import "./HomePage.css";
import Discussion from '../Discussion/Discussion';
import Navbar from '../Header/Navbar/Navbar'
class HomePage extends Component {
      componentDidMount() {
            if(!("usertoken" in localStorage)) {
                  this.props.history.push("/");
            }
      }
      render() {
            return (
                  <div style={{ width: 100 + '%' }}>
                        <Navbar></Navbar>
                        <div id="homepage-container">
                              <Discussion></Discussion>
                              <div id="sidebar-container">
                              <Link to="/create" id="create-post-container"><button id="create-post-button">Create Post</button></Link>
                              </div>
                              
                        </div>
                  </div>
            );

      }
}

export default HomePage;