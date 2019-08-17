import React, { Component } from 'react';
import CreateDiscussions from "../CreateDiscussion/CreateDiscussion"
import { Route, Link } from "react-router-dom"
import "./HomePage.css";
import Discussion from '../Discussion/Discussion';
import Logo from "../Header/Logo/index"
class HomePage extends Component {
      constructor(props) {
            super(props);
            this.handleCreateButton = this.handleCreateButton.bind(this);
            this.state = {
                  createPostPressed: false,
            }
      }

      handleCreateButton() {
            this.setState({
                  createPostPressed: true,
            })
      }
      render() {
            let createPostPressed = this.state.createPostPressed;
            let createPostButton = <CreatePostButton onClick={this.handleCreateButton} />
            if (createPostPressed) {
                  return (
                        <Route to="/create" component={CreateDiscussions}></Route>
                  )
            }
            return (
                  <div style={{width: 100 + '%'}}>
                        <div id="homepage-container">
                              <Discussion></Discussion>
                              <Link to="/create">{createPostButton}</Link>
                        </div>
                  </div>
            );

      }
}
function CreatePostButton(props) {
      return (
            <button onClick={props.onClick} id="create-post-button">Create Post</button>

      )
}
export default HomePage;