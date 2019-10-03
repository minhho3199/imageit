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
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'
import { confirmAlert } from 'react-confirm-alert';
import { Link } from 'react-router-dom'
import "react-confirm-alert/src/react-confirm-alert.css"

class SinglePost extends Component {
    constructor(props) {
        super(props);
        this.arrayBufferToBase64 = this.arrayBufferToBase64.bind(this);
        this.handleCommentClick = this.handleCommentClick.bind(this);
        this.handleLikedClick = this.handleLikedClick.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.submit = this.submit.bind(this);
        this.state = {
            comments: false,
            showSelector: false,
            counters: this.props.reactions,
            username: '',
            userID: '',
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
                    userID: decoded.id
                });
            }
        }
    }

    //Source code from react-reactions package
    //https://casesandberg.github.io/react-reactions/
    handleSelect(emoji) {
        const index = _.findIndex(this.state.counters, { by: this.state.userID })
        if (index > -1) {
            this.setState({
                counters: [
                    ...this.state.counters.slice(0, index),
                    { emoji, by: this.state.userID },
                    ...this.state.counters.slice(index + 1),
                ],
                showSelector: false,
            })
        } else {
            this.setState({
                counters: [...this.state.counters, { emoji, by: this.state.userID }],
                showSelector: false,
            })
        }
        const token = localStorage.usertoken;
        var config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': token,
            },
        };
        console.log(emoji)
        const fd = new FormData();
        fd.append('emoji', emoji);
        fd.append('by', this.state.userID);
        axios.post('http://localhost:5000/api/posts/likes/' + this.props.id, fd, config)
            .then(result => {
                console.log(result);
            })
            .catch(err => console.log(err))

    }

    handleDelete(e) {
        const token = localStorage.usertoken;
        var config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': token,
            },
        };
        axios.delete("http://localhost:5000/api/posts/delete/" + this.props.id, config)
            .then(() => this.props.history.push('/home'))
            .catch(err => console.log(err));
    }

    //Convert hex numbers of the image to Base64
    //This code is based on the tutorial by Colin Reilly on medium.com
    //See https://medium.com/@colinrlly/send-store-and-show-images-with-react-express-and-mongodb-592bc38a9ed
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

    submit = () => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='custom-ui'>
                        <h2>Confirm Delete</h2>
                        <h5>Are you sure you want to delete this file?</h5>
                        <div id="confirm-container">
                            <Button variant="outline-secondary" onClick={onClose}>No</Button>
                            <form style={{ margin: 0 }} >
                                <Button variant="primary" type="submit" onClick={this.handleDelete} className="confirm-button">Yes, Delete it!</Button>
                            </form>
                        </div>

                    </div >
                )
            }
        })
    };
    render() {
        var base64Flag = 'data:image/jpeg;base64,';
        return (
            <div>
                <div className="title-container">
                    <h3 className="title">{this.props.title}</h3>
                    {/*If the current user is the person who created the post, show dropdown options */}
                    {(this.props.authorID === this.state.userID) ?
                        <DropdownButton className="dropdown-button" title="">
                            {(!this.props.comments.length && !this.state.counters.length) ?
                                /*This code is based on code by Tyler McGinnis on Youtube 
                                See https://www.youtube.com/watch?v=nmbX2QL7ZJc*/
                                <Link style={{textDecoration: 'none'}}to={{
                                    pathname: "/update/" + this.props.id,
                                    state: {
                                        title: this.props.title
                                    }
                                }}>
                                    <Dropdown.Item as="button" id="dropdown-items">Update Post</Dropdown.Item></Link>
                                : null}
                            <Dropdown.Item as="button" id="dropdown-items" onClick={this.submit}>Delete Post</Dropdown.Item>
                        </DropdownButton> : null}
                </div>
                <div className="posted-by-container">
                    <span>by <b>{this.props.author}</b></span>
                </div>
                <div className="pic-container">
                    <img src={base64Flag + this.arrayBufferToBase64(this.props.image)} className="picture" alt=""></img>
                </div>
                <FacebookCounter
                    counters={this.state.counters}
                    bg="#fafafa"
                />
                <div className="button-container">
                    <button onClick={this.handleLikedClick}><FontAwesomeIcon icon={faThumbsUp} /> Like</button>
                    <button onClick={this.handleCommentClick}><FontAwesomeIcon icon={faComment} /> Comment</button>
                </div>
                {
                    this.state.showSelector ?
                        <FacebookSelector onSelect={this.handleSelect}></FacebookSelector> : null
                }
                {this.state.comments ? <Comments postID={this.props.id} comment={this.props.comments}></Comments> : null}
            </div >
        );
    }
}

export default SinglePost;