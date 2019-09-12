import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from '../HomePage/HomePage';
import Login from '../Login/Login';
import CreateDiscussion from '../CreateDiscussion/CreateDiscussion';
import Signup from '../Signup/Signup'
import LandingPage from "../LandingPage/LandingPage";

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
          <Route exact path="/create" component={CreateDiscussion} />
        </Switch>
      </div>
    )
  }
}

export default Routes;

