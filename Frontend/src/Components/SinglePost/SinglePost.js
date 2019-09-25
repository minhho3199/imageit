import React, { Component } from 'react';
import "./SinglePost.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faComment } from '@fortawesome/free-solid-svg-icons';
import Comments from '../Comments/Comments';
import FacebookSelector from '../facebook/FacebookSelector';
import FacebookCounter from '../facebook/FacebookCounter';
import jwt_decode from 'jwt-decode';
import _ from 'lodash';
import axios from 'axios'

class SinglePost extends Component {
    constructor(props) {
        super(props);
        this.arrayBufferToBase64 = this.arrayBufferToBase64.bind(this);
        this.handleCommentClick = this.handleCommentClick.bind(this);
        this.handleLikedClick = this.handleLikedClick.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            comments: false,
            showSelector: false,
            counters: this.props.reactions,
            username: '',
            by: '',
            emojiSelect: '',
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
                    username: decoded.name,
                    by: decoded.id
                });
            }
        }
    }

    //Source code from react-reactions package
    //https://casesandberg.github.io/react-reactions/
    handleSelect(emoji) {
        const index = _.findIndex(this.state.counters, { by: this.state.username })
        if (index > -1) {
            this.setState({
                counters: [
                    ...this.state.counters.slice(0, index),
                    { emoji, by: this.state.username },
                    ...this.state.counters.slice(index + 1),
                ],
                showSelector: false,
                emojiSelect: emoji,
            })
        } else {
            this.setState({
                counters: [...this.state.counters, { emoji, by: this.state.username }],
                showSelector: false,
                emojiSelect: emoji,
            })
        }

    }
    handleSubmit() {
        const token = localStorage.usertoken;
        var config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': token,
            },
        };
        console.log(this.state.emojiSelect)
        const fd = new FormData();
        fd.append('emoji', this.state.emojiSelect);
        fd.append('by', this.state.by);
        axios.post('http://localhost:5000/api/posts/likes/' + this.props.id, {
            emoji: this.state.emojiSelect,
            by: this.state.by,
        }, config)
            .then(result => {
                console.log(result);
            })
            .catch(err => console.log(err))
    }
    
    //Convert hex numbers of the image to Base64
    //https://medium.com/@colinrlly/send-store-and-show-images-with-react-express-and-mongodb-592bc38a9ed
    arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };

    handleCommentClick() {
        this.setState({
            comments: !this.state.comments,
            showSelector: false
        })
    }

    handleLikedClick() {
        this.setState({
            showSelector: !this.state.showSelector,
            comments: false,
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
                <FacebookCounter
                    counters={this.state.counters}
                    user={this.state.username}
                    bg="#fafafa"
                />
                <div className="button-container">
                    <button onClick={this.handleLikedClick}><FontAwesomeIcon icon={faThumbsUp} /> Like</button>
                    <button onClick={this.handleCommentClick}><FontAwesomeIcon icon={faComment} /> Comment</button>
                </div>
                {this.state.showSelector ? <div>
                    <form onSubmit={this.handleSubmit}>
                        <FacebookSelector onSelect={this.handleSelect}></FacebookSelector>
                    </form>
                </div> : null}
                {this.state.comments ? <Comments postID={this.props.id}></Comments> : null}
            </div>
        );
    }
}

export default SinglePost;