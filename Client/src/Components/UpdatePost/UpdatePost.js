import React, { Component } from 'react'
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
            title: "",
            image: null,
            userId: '',
            imgSrc: null,
            showDropzone: true,
            imageError: "",
            titleError: "",
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
            titleError: "",
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
                showDropzone: false,
                imageError: "",
            })
        }
    }
    handleSubmit(e) {
        e.preventDefault();
        if (!this.state.showDropzone && this.state.title !== "") {

            const token = localStorage.usertoken;
            var config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': token,
                },
            };
            const fd = new FormData();
            const { id } = this.props.match.params;
            fd.append('title', this.state.title);
            fd.append('image', this.state.image);
            fd.append('author', this.state.userId);
            axios.post('/api/posts/update/' + id, fd, config)
                .then(result => {
                    console.log(result)
                })
                .then(() => this.props.history.push('/home'))
                .catch(err => console.log(err))
        } else if (this.state.title === "") {
            this.setState({
                titleError: "This field is required",
            })
        } else {
            this.setState({
                imageError: "You have not attached a picture yet",
            })
        }

    }

    //This code is similar to the Delete post function, however instead this enables the user to resubmit and upload an image. Sending it over to the database to delete te current image and replace it with one that is uploaded.
    render() {
        const maxSize = 1500000;
        const { title } = this.props.location.state
        const { imgSrc } = this.state;
        return (
            <div>
                <Navbar></Navbar>
                <div style={{ paddingTop: 5 + '%' }}>
                    <div className="create-container">
                        <h2>Update the Post</h2>
                        <form className="upload-form" onSubmit={this.handleSubmit} noValidate>
                            <input type="text" placeholder={title} id="title" required onChange={this.handleTitleChange}></input>
                            <span className="error-text">{this.state.titleError}</span>
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
                            <img src={imgSrc} alt=""></img>
                            <span className="error-text">{this.state.imageError}</span>
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
