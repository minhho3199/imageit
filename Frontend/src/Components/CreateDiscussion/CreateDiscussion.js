import React, { Component } from 'react'
import "./CreateDiscussion.css"
import { Link } from "react-router-dom"
import Navbar from '../Header/Navbar/Navbar'
import Dropzone from 'react-dropzone'

export default class CreateDiscussion extends Component {
      constructor(props) {
            super(props);
            this.state = {}
      }

      componentDidMount() {
            if (!("usertoken" in localStorage)) {
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
                                    <form>
                                          <input type="text" placeholder="Title" id="title"></input>
                                          <Dropzone onDrop={this.onDrop}>
                                                {({ getRootProps, getInputProps, isDragActive }) => (
                                                      <div {...getRootProps()}>
                                                            <input {...getInputProps()} />
                                                            {isDragActive ? "Drop it like it's hot!" : 'Click me or drag a file to upload!'}
                                                      </div>
                                                )}
                                          </Dropzone>
                                          <div id="button-container">
                                                <Link to="/home" className="link"><button className="button" id="cancel">Cancel</button></Link>
                                                <button className="button" id="submit">Submit</button>
                                          </div>
                                    </form>

                              </div>
                        </div>
                  </div>
            )
      }
}
