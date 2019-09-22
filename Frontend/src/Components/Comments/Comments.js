import React, { Component } from 'react';
import './Comments.css';
import Dropzone from 'react-dropzone';
import jwt_decode from 'jwt-decode';
import axios from 'axios'
import CommentList from '../CommentList/CommentList';
class Comments extends Component {
    constructor(props) {
        super(props);
        this.onDrop = this.onDrop.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            image: null,
            userId: '',
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
        fd.append('image', this.state.image);
        fd.append('createBy', this.state.userId);
        axios.post('http://localhost:5000/api/posts/comment/' + this.props.postID, fd, config)
              .then(result => {
                    console.log(result);
              })
              .catch(err => console.log(err))
    }
    onDrop(files) {
        this.setState({
            image: files[0]
        })
    }
    render() {
        const maxSize = 5242880;
        return (
            <div>
                <form className="comment-upload-container" onSubmit={this.handleSubmit}>
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
                    <button className="button" id="submit-button">Comment</button>
                </form>
                <CommentList postID={this.props.postID}></CommentList> 
            </div>
        );
    }
}

export default Comments;
