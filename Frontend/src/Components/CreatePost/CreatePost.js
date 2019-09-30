import React, { Component } from 'react'
import "./CreatePost.css"
import { Link } from "react-router-dom"
import Navbar from '../Header/Navbar/Navbar'
import Dropzone from 'react-dropzone'
import axios from 'axios';
import jwt_decode from 'jwt-decode';

export default class CreateDiscussion extends Component {
      constructor(props) {
            super(props);
            this.handleTitleChange = this.handleTitleChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
            this.onDrop = this.onDrop.bind(this);
            this.state = {
                  title: '',
                  image: null,
                  userId: '',
                  imgSrc: null,
                  showDropzone: true
            }
      }

      componentDidMount() {
            if (!("usertoken" in localStorage)) {
                  this.props.history.push("/");
            } else {
                  const token = localStorage.usertoken;
                  if (token) {
                        const decoded = jwt_decode(token);
                        this.setState({
                              userId: decoded.id,
                        });
                  }
            }
      }
      handleTitleChange(e) {
            this.setState({
                  title: e.target.value,
            })
      }
      //This code is based on a video by CodingEntrepreneurs on Youtube
      //See https://www.youtube.com/watch?v=S6Zus2bLJCc
      onDrop(files) {
            this.setState({
                  image: files[0],
            })
            const reader = new FileReader()
            const currentFile = files[0];
            if (currentFile !== undefined) {
                  reader.addEventListener("load", () => {
                        this.setState({
                              imgSrc: reader.result
                        })
                  }, false
                  )
                  reader.readAsDataURL(currentFile)
                  this.setState({
                        showDropzone: false
                  })
            }
      }
      handleSubmit(e) {
            e.preventDefault();
            const token = localStorage.usertoken;
            var config = {
                  headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': token,
                  },
            };
            const fd = new FormData();
            fd.append('title', this.state.title);
            fd.append('image', this.state.image);
            fd.append('author', this.state.userId);
            axios.post('http://localhost:5000/api/posts/create', fd, config)
                  .then(result => {
                        console.log(result);
                  })
                  .then(() => this.props.history.push('/home'))
                  .catch(err => console.log(err))
      }

      render() {
            const maxSize = 5242880;

            const { imgSrc } = this.state;
            return (
                  <div>
                        <Navbar></Navbar>
                        <div style={{ paddingTop: 5 + '%' }}>
                              <div className="create-container">
                                    <h2>Create a post</h2>
                                    <form className="upload-form" onSubmit={this.handleSubmit}>
                                          <input type="text" placeholder="Title" id="title" required onChange={this.handleTitleChange}></input>
                                          {this.state.showDropzone ?
                                                //This code is by James King on upmostly.com
                                                //See https://upmostly.com/tutorials/react-dropzone-file-uploads-react
                                                <Dropzone onDrop={this.onDrop}
                                                      accept="image/png, image/jpeg, image/gif"
                                                      multiple={false}
                                                      minSize={0}
                                                      maxSize={maxSize}>
                                                      {({ getRootProps, getInputProps, isDragActive, isDragReject, rejectedFiles }) => {
                                                            const isFileTooLarge = rejectedFiles.length > 0 && rejectedFiles[0].size > maxSize;
                                                            return (
                                                                  <div {...getRootProps()} className="upload">
                                                                        <input {...getInputProps()} required />
                                                                        {!isDragActive && 'Click here or drop a file to upload!'}
                                                                        {isDragActive && !isDragReject && "Drop it like it's hot!"}
                                                                        {isDragReject && "File type not accepted"}
                                                                        {isFileTooLarge && (
                                                                              <div className="text-danger too-large-text">
                                                                                    File is too large
                                                                        </div>)}
                                                                  </div>
                                                            )
                                                      }
                                                      }
                                                </Dropzone> : null}
                                          <img src={imgSrc}></img>
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
