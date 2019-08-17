import React, { Component } from 'react';
import "./Discussion.css";
import placeholderpic from "./placeholderpic.jpg"
import placeholderpic2 from "./placeholderpic2.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faComment } from '@fortawesome/free-solid-svg-icons';

class Discussion extends Component {
      constructor(props) {
            super(props);
            this.state = {}
      }
      render() {
            return (
                  <div id="container">
                        <div className="discussion-container">
                              <div className="title-container">
                                    <h3 className="title"><a>Demo title</a></h3>
                              </div>
                              <div className="posted-by-container">
                                    <span>by </span>
                                    <a>Anonymous</a>
                              </div>
                              <div className="pic-container">
                                    <img src={placeholderpic} className="picture"></img>
                              </div>
                              <div className="button-container">
                                    <button><FontAwesomeIcon icon={faThumbsUp} /> Like</button>
                                    <button><FontAwesomeIcon icon={faComment} /> Comment</button>
                              </div>
                        </div>
                        <div className="discussion-container">
                              <div className="title-container">
                                    <h3 className="title"><a>Test post #2</a></h3>
                              </div>
                              <div className="posted-by-container">
                                    <span>by </span>
                                    <a>Somebody</a>
                              </div>
                              <div className="pic-container">
                                    <img src={placeholderpic2} className="picture"></img>
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