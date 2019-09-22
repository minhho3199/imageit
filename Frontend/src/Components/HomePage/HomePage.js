import React, { Component } from 'react';
import { Link } from "react-router-dom"
import "./HomePage.css";
import AllPosts from '../AllPosts/AllPosts';
import Navbar from '../Header/Navbar/Navbar'
import ScrollUpButton from "react-scroll-up-button";

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
                              <AllPosts></AllPosts>
                              <div id="sidebar-container">
                              <Link to="/create" id="create-post-container"><button id="create-post-button">Create Post</button></Link>
                              </div>
                              <ScrollUpButton style={{background: '#0079d3'}}></ScrollUpButton>
                        </div>
                  </div>
            );

      }
}

export default HomePage;