import React, { Component } from 'react';
import './Comments.css';
import Dropzone from 'react-dropzone';
import jwt_decode from 'jwt-decode';
import axios from 'axios'
import CommentList from "./CommentList/CommentList"

class Comments extends Component {
    constructor(props) {
        super(props);
        this.onDrop = this.onDrop.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.arrayBufferToBase64 = this.arrayBufferToBase64.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.state = {
            image: null,
            userId: '',
            imgSrc: null,
            comments: [],
            imageError: "",
            imageAttached: false,
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
            axios.get("http://localhost:8080/api/posts/comment/" + this.props.postID)
                .then(res => {
                    this.setState({
                        comments: res.data,
                    })
                })
                .catch(err => console.log(err));
        }
    }

    //This code is based on the tutorial by Colin Reilly on medium.com
    //See https://medium.com/@colinrlly/send-store-and-show-images-with-react-express-and-mongodb-592bc38a9ed
    arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };

    handleCancel() {
        this.setState({
            image: null,
            imgSrc: null,
            imageAttached: false,
        })
    }


    handleSubmit(e) {
        e.preventDefault();
        if (this.state.imageAttached) {
            const token = localStorage.usertoken;
            var config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': token,
                },
            };
            const fd = new FormData();
            fd.append('image', this.state.image);
            fd.append('createBy', this.state.userId);
            axios.post('http://localhost:8080/api/posts/comment/' + this.props.postID, fd, config)
                .then(result => {
                    console.log(result);
                    this.setState({
                        image: null,
                        imgSrc: null,
                    })
                }).then(() => {
                    axios.get("http://localhost:8080/api/posts/comment/" + this.props.postID)
                        .then(res => {
                            this.setState({
                                comments: res.data,
                            })
                        })
                        .catch(err => console.log(err));
                })
                .catch(err => console.log(err))
        } else {
            this.setState({
                imageError: "You have not attached a picture yet"
            })
        }
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
                imageAttached: true,
                imageError: "",
            })
        }
    }
    render() {
        const maxSize = 5242880;
        const { imgSrc } = this.state;
        return (
            <div>
                <form className="comment-upload-container" method="POST">
                    {/*This code is by James King on upmostly.com
                    See https://upmostly.com/tutorials/react-dropzone-file-uploads-react*/}
                    <Dropzone onDrop={this.onDrop}
                        accept="image/png, image/jpeg, image/gif"
                        multiple={false}
                        minSize={0}
                        maxSize={maxSize}>
                        {({ getRootProps, getInputProps, isDragActive, isDragReject, rejectedFiles }) => {
                            const isFileTooLarge = rejectedFiles.length > 0 && rejectedFiles[0].size > maxSize;
                            return (
                                <div {...getRootProps()} className="comment-upload">
                                    <input {...getInputProps()} required />
                                    {!isDragActive && 'Click here or drop a file to comment'}
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
                    </Dropzone>
                    <span className="error-text" style={{ alignSelf: 'flex-start' }}>
                        {this.state.imageError}
                    </span>
                    <img src={imgSrc} className="comment-pic preview" alt=""></img>
                    <div>
                        <button type="button"
                            className="button"
                            id="cancel-button"
                            onClick={this.handleCancel}>Cancel</button>
                        <button type="submit"
                            className="button"
                            id="submit-button"
                            onClick={this.handleSubmit}>Comment</button>
                    </div>
                </form>
                {this.state.comments.map(comment => (
                    <div key={comment._id} className="comment-container">
                        <CommentList
                            postID={this.props.postID}
                            commentID={comment._id}
                            author={comment.createBy.name}
                            image={comment.image.data}></CommentList>
                    </div>

                ))}
            </div>
        );
    }
}

export default Comments;
