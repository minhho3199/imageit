import React, { Component } from 'react';
import "./Discussion.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faComment } from '@fortawesome/free-solid-svg-icons';

class Discussion extends Component {
      constructor(props) {
            super(props);
            this.arrayBufferToBase64 = this.arrayBufferToBase64.bind(this);
            this.state = {
                  posts: [],
            }
      }

      arrayBufferToBase64(buffer) {
            var binary = '';
            var bytes = [].slice.call(new Uint8Array(buffer));
            bytes.forEach((b) => binary += String.fromCharCode(b));
            return window.btoa(binary);
      };

      componentDidMount() {
            fetch("http://localhost:5000/api/posts/")
                  .then(res => res.json())
                  .then(data => {
                        this.setState({
                              posts: data,
                        })

                  })

      }
      render() {
            var base64Flag = 'data:image/jpeg;base64,';
            return (
                  <div id="container">
                        {this.state.posts.map(post => (
                              <div className="discussion-container" key={post._id}>
                                    <div className="title-container">
                                          <h3 className="title">{post.title}</h3>
                                    </div>
                                    <div className="posted-by-container">
                                          <span>by <em>{post.author.name}</em></span>
                                    </div>
                                    <div className="pic-container">
                                          <img src={base64Flag + this.arrayBufferToBase64(post.image.data)} className="picture"></img>
                                    </div>
                                    <div className="button-container">
                                          <button><FontAwesomeIcon icon={faThumbsUp} /> Like</button>
                                          <button><FontAwesomeIcon icon={faComment} /> Comment</button>
                                    </div>
                              </div>
                        ))}
                  </div>
            );
      }
}

export default Discussion;