import React, { Component } from 'react';
import "./Discussion.css";
import placeholderpic2 from "./placeholderpic2.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faComment } from '@fortawesome/free-solid-svg-icons';

class Discussion extends Component {
      constructor(props) {
            super(props);
            this.arrayBufferToBase64 = this.arrayBufferToBase64.bind(this);
            this.state = {
                  title: '',
                  img: '',
            }
      }
      arrayBufferToBase64(buffer) {
            var binary = '';
            var bytes = [].slice.call(new Uint8Array(buffer));
            bytes.forEach((b) => binary += String.fromCharCode(b));
            return window.btoa(binary);
      };

      componentWillMount() {
            fetch("http://localhost:5000/api/posts/")
                  .then(res => res.json())
                  .then(data => {
                        console.log(data);
                        var base64Flag = 'data:image/jpeg;base64,';
                        var imageStr = this.arrayBufferToBase64(data.image.data);
                        this.setState({
                              img: base64Flag + imageStr,
                              title: data.title,
                        })

                  })
      }
      render() {
            const { img } = this.state;
            return (
                  <div id="container">
                        <div className="discussion-container">
                              <div className="title-container">
                                    <h3 className="title">{this.state.title}</h3>
                              </div>
                              <div className="posted-by-container">
                                    <span>by </span>
                              </div>
                              <div className="pic-container">
                                    <img src={img} className="picture"></img>
                              </div>
                              <div className="button-container">
                                    <button><FontAwesomeIcon icon={faThumbsUp} /> Like</button>
                                    <button><FontAwesomeIcon icon={faComment} /> Comment</button>
                              </div>
                        </div>
                        <div className="discussion-container">
                              <div className="title-container">
                                    <h3 className="title">{this.state.title}</h3>
                              </div>
                              <div className="posted-by-container">
                                    <span>by </span>
                              </div>
                              <div className="pic-container">
                                    <img src={img} className="picture"></img>
                              </div>
                              <div className="button-container">
                                    <button><FontAwesomeIcon icon={faThumbsUp} /> Like</button>
                                    <button><FontAwesomeIcon icon={faComment} /> Comment</button>
                              </div>
                        </div>
                  </div>
            );
      }
}

export default Discussion;