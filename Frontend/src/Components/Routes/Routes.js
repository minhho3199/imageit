import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from '../HomePage/HomePage';
import Login from '../Login/Login';
import CreatePost from '../CreatePost/CreatePost';
import Signup from '../Signup/Signup'
import LandingPage from "../LandingPage/LandingPage";
import Profile from '../Profile/Profile';

class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/home" component={HomePage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/create" component={CreatePost} />
          <Route exact path="/profile" component={Profile} />
        </Switch>
      </div>
    )
  }
}

export default Routes;

