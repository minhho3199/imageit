import React, { Component } from 'react';
import { Link } from "react-router-dom"
import "./HomePage.css";
import AllPosts from '../AllPosts/AllPosts';
import Navbar from '../Header/Navbar/Navbar'
import ScrollUpButton from "react-scroll-up-button";
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

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
      }
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
      render() {
            return (
                  <div style={{ width: 100 + '%' }}>
                        <Navbar></Navbar>
                        <div id="content-container">
                              <DropdownButton alignRight title={this.state.sort}>
                                    <Dropdown.Item as="button" id="dropdown-items" onClick={this.handleNewSort}>New</Dropdown.Item>
                                    <Dropdown.Item as="button" id="dropdown-items" onClick={this.handlePopularSort}>Popular</Dropdown.Item>
                              </DropdownButton>

                        </div>
                        <div id="homepage-container">

                              <AllPosts sort={this.state.sort}></AllPosts>

                              <div id="sidebar-container">
                                    <Link to="/create" id="create-post-container"><button id="create-post-button">Create Post</button></Link>
                              </div>
                              <ScrollUpButton style={{ background: '#0079d3' }}></ScrollUpButton>
                        </div >
                  </div >
            );

      }
}

export default HomePage;