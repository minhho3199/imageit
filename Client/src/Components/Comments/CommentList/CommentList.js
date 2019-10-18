import React, { Component } from 'react';
import Reply from "../Reply/Reply";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';

//This overall code enables us to view, distribute and store images via the virtual server MongoDB. This is the main way of collecting and storring our data which are images and displaying them onto our website to be viewed.
class CommentList extends Component {
    constructor(props) {
        super(props);
        this.arrayBufferToBase64 = this.arrayBufferToBase64.bind(this);
        this.handleReply = this.handleReply.bind(this);
        this.state = {
            reply: false,
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
    handleReply() {
        this.setState({
            reply: !this.state.reply,
        })
    }

    render() {
        var base64Flag = 'data:image/jpeg;base64,';
        return (
            <div>
                <div className="contain">
                    <div className="comment-author-container">
                        <span><b>{this.props.author}</b></span>
                    </div>
                    <div className="comment-pic-container">
                        <img src={base64Flag + this.arrayBufferToBase64(this.props.image)}
                            className="comment-pic" alt=""></img>
                    </div>
                </div>
                <button className="reply-button" onClick={this.handleReply}> <FontAwesomeIcon icon={faComment} /> Reply</button>
                {this.state.reply ? <Reply postID={this.props.postID} commentID={this.props.commentID} /> : null}
            </div>

        );
    }
}

export default CommentList;