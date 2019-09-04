import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from '../HomePage/HomePage';
import Login from '../Login/Login';
import CreateDiscussion from '../CreateDiscussion/CreateDiscussion';
import Signup from '../Signup/Signup'
import LandingPage from "../LandingPage/LandingPage";
import Navbar from '../Header/Navbar/Navbar';

class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <div>
        <Switch>
          <Route path="/" exact component={LandingPage} />
          <Route path="/home" exact component={HomePage} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/create" exact component={CreateDiscussion} />
        </Switch>
      </div>
    )
  }
}

export default Routes;

