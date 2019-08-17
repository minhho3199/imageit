import React, { Component } from 'react';
import { Route, Link } from "react-router-dom"
import Discussion from '../Discussion/Discussion'
import "./styles.css";
class DiscussionList extends Component {
      constructor(props) {
            super(props);
            this.state = {}
      }
      render() {
            return (
                  <div id="container">
                        <div id="list-header">
                              <h4>DISCUSSION</h4>
                              <div id="sort">
                                    <a>Latest</a>
                                    <a>Popular</a>
                              </div>
                        </div>
                        <Discussion></Discussion>
                  </div>
            );
      }
}

export default DiscussionList;