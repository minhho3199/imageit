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
                                          <Dropzone className="upload" onDrop={this.onDrop}
                                                accept="image/png, image/jpeg, image/gif"
                                                minSize={0}>
                                                {({ getRootProps, getInputProps, isDragActive, isDragReject, rejectedFiles }) => {
                                                      const isFileTooLarge = rejectedFiles.length > 0;
                                                      return (
                                                            <div {...getRootProps()}>
                                                                  <input {...getInputProps()} />
                                                                  {!isDragActive && 'Click here or drop a file to upload!'}
                                                                  {isDragActive && !isDragReject && "Drop it like it's hot!"}
                                                                  {isDragReject && "File type not accepted, sorry!"}
                                                                  {isFileTooLarge && (
                                                                        <div className="text-danger mt-2">
                                                                              File is too large.
                </div>
                                                                  )}
                                                            </div>
                                                      )
                                                }
                                                }
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
