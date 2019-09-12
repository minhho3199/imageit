import React, { Component } from 'react'
import "./CreateDiscussion.css"
import { Link } from "react-router-dom"
import Navbar from '../Header/Navbar/Navbar'

export default class CreateDiscussion extends Component {
      constructor(props) {
            super(props);
            this.state = {}
      }

      componentDidMount() {
            if(!("usertoken" in localStorage)) {
                  this.props.history.push("/");
            }
      }
      render() {
            return (
                  <div>
                        <Navbar></Navbar>
                        <div style={{ paddingTop: 5 + '%' }}>
                              <div className="create-container">
                                    <h2>Create a post</h2>
                                    <input type="text" placeholder="Title" id="title"></input>
                                    <textarea readOnly id="photo">Drag and drop or upload</textarea>
                                    <div id="button-container">
                                          <Link to="/home" className="link"><button className="button" id="cancel">Cancel</button></Link>
                                          <button className="button" id="submit">Submit</button>
                                    </div>
                              </div>
                        </div>
                  </div>
            )
      }
}
