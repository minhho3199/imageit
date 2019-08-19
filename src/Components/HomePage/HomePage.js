import React, { Component } from 'react';
import { Link } from "react-router-dom"
import "./HomePage.css";
import Discussion from '../Discussion/Discussion';

class HomePage extends Component {
      constructor(props) {
            super(props);
      }

      render() {
            return (
                  <div style={{width: 100 + '%'}}>
                        <div id="homepage-container">
                              <Discussion></Discussion>
                              <Link to="/create"><button id="create-post-button">Create Post</button></Link>
                        </div>
                  </div>
            );

      }
}

export default HomePage;