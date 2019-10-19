import React, { Component } from 'react';
import { Link } from "react-router-dom"
import "./HomePage.css";
import AllPosts from '../AllPosts/AllPosts';
import Navbar from '../Header/Navbar/Navbar'
import ScrollUpButton from "react-scroll-up-button";
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Leaderboards from '../Leaderboards/Leaderboards'

class HomePage extends Component {
      constructor(props) {
            super(props);
            this.handleNewSort = this.handleNewSort.bind(this);
            this.handlePopularSort = this.handlePopularSort.bind(this);
            this.state = {
                  sort: localStorage.getItem("sort"),
            }
      }
      componentDidMount() {
            if (!("usertoken" in localStorage)) {
                  this.props.history.push("/");
            }
            //If there is no sort in localStorage, then the default will be sort by new
            if (!("sort" in localStorage)) {
                  this.setState({
                        sort: "Sort by: New "
                  })
            } else {
                  this.setState({
                        sort: localStorage.getItem("sort")
                  })
            }

      }
      //Saves the sort state to localStorage so that it can be used in other components
      handleNewSort() {
            this.setState({
                  sort: "Sort by: New ",
            }, () => {
                  localStorage.setItem("sort", this.state.sort);
            })
      }
      handlePopularSort() {
            this.setState({
                  sort: "Sort by: Popular ",
            }, () => {
                  localStorage.setItem("sort", this.state.sort);
            })
      }
      
      //The main code used for displaying the HomePage of the Website. This is where multiple buttons are contained in which transport the user to different sections of the website like uploading, signing out or deleting posts.
      render() {
            return (
                  <div style={{ width: 100 + '%' }}>
                        <Navbar></Navbar>
                        <div id="sort-container">
                              <DropdownButton alignRight title={this.state.sort}>
                                    <Dropdown.Item as="button" id="dropdown-items" onClick={this.handleNewSort}>New</Dropdown.Item>
                                    <Dropdown.Item as="button" id="dropdown-items" onClick={this.handlePopularSort}>Popular</Dropdown.Item>
                              </DropdownButton>

                        </div>
                        <div id="homepage-container">

                              <AllPosts sort={this.state.sort}></AllPosts>

                              <div id="sidebar-container">
                                    <Link to="/create" id="create-post-container"><button id="create-post-button">Create Post</button></Link>
                                    <Leaderboards></Leaderboards>
                              </div>
                              <ScrollUpButton style={{ background: '#0079d3' }}></ScrollUpButton>
                        </div >
                  </div >
            );

      }
}

export default HomePage;