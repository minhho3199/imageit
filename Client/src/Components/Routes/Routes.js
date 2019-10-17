import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from '../HomePage/HomePage';
import Login from '../Login/Login';
import CreatePost from '../CreatePost/CreatePost';
import Signup from '../Signup/Signup'
import LandingPage from "../LandingPage/LandingPage";
import UpdatePost from '../UpdatePost/UpdatePost'

class Routes extends Component {
  render() {
    //This code is simply used to keep the website connected, allowing each button and container to maintan the same instead of creating a new one. This allows for consistancy and resource saving.
    return (
      <div>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/home" component={HomePage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/create" component={CreatePost} />
          {/*This code is based on code by Tyler McGinnis on Youtube 
          See https://www.youtube.com/watch?v=nmbX2QL7ZJc*/}
          <Route exact path="/update/:id" component={UpdatePost} />
        </Switch>
      </div>
    )
  }
}

export default Routes;

