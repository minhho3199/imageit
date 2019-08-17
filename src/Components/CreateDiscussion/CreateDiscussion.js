import React, { Component } from 'react'
import "./CreateDiscussion.css"
import { Route, Link} from "react-router-dom"
import HomePage from "../HomePage/HomePage"

export default class CreateDiscussion extends Component {
      constructor(props) {
            super(props);
            this.handleCancelClick = this.handleCancelClick.bind(this);
            this.state = {
                  cancelPressed: false,
            }
      }
      handleCancelClick() {
            this.setState({
                  cancelPressed: true,
            })
      }
      render() {
            let cancelPressed = this.state.cancelPressed;
            let cancelButton = <button className="button" id="cancel" onClick={this.handleCancelClick}>Cancel</button>
            if(cancelPressed) {
                  return (
                        <Route to="/" component={HomePage} />
                  ) 
            }
            return (
                  <div style={{paddingTop: 5 + '%'}}>
                        <div className="create-container">
                              <h2>Create a post</h2>
                              <input type="text" placeholder="Title" id="title"></input>
                              <textarea readOnly id="photo">Drag and drop or upload</textarea>
                              <div id="button-container">
                                    <Link to="/" className="link">{cancelButton}</Link>
                                    <button className="button" id="submit">Submit</button>
                              </div>
                        </div>
                  </div>
            )
      }
}
