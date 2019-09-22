import React, { Component } from 'react';
import "./SinglePost.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faComment } from '@fortawesome/free-solid-svg-icons';
import Comments from '../Comments/Comments';

class SinglePost extends Component {
    constructor(props) {
        super(props);
        this.arrayBufferToBase64 = this.arrayBufferToBase64.bind(this);
        this.handleCommentClick = this.handleCommentClick.bind(this);
        this.state = {
            comments: false,
        }
    }

    arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };

    handleCommentClick() {
        this.setState({
            comments: !this.state.comments,
        })
    }
    render() {
        var base64Flag = 'data:image/jpeg;base64,';
        return (
            <div>
                <div className="title-container">
                    <h3 className="title">{this.props.title}</h3>
                </div>
                <div className="posted-by-container">
                    <span>by <em>{this.props.author}</em></span>
                </div>
                <div className="pic-container">
                    <img src={base64Flag + this.arrayBufferToBase64(this.props.image)} className="picture"></img>
                </div>
                <div className="button-container">
                    <button><FontAwesomeIcon icon={faThumbsUp} /> Like</button>
                    <button onClick={this.handleCommentClick}><FontAwesomeIcon icon={faComment} /> Comment</button>
                </div>
                {this.state.comments ? <Comments postID={this.props.id}></Comments> : null}
            </div>
        );
    }
}

export default SinglePost;