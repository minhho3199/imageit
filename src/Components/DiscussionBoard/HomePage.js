import React, { Component } from 'react';
import CreateDiscussions from "./CreateDiscussion"
import { Route, Link } from "react-router-dom"
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
                  <Link to="/create">{createPostButton}</Link>
            );

      }
}
function CreatePostButton(props) {
      return (
            <button onClick={props.onClick}>Create Post</button>

      )
}
export default HomePage;