import React from 'react';
import {Route, Switch} from 'react-router-dom';
import HomePage from '../HomePage/HomePage';
import Login from '../Login/Login';
import CreateDiscussion from '../CreateDiscussion/CreateDiscussion';
import Signup from '../Signup/Signup'

export default () =>
  <Switch>
    <Route path="/" exact component={HomePage} />
    <Route path="/login" exact component={Login} />
    <Route path="/signup" exact component={Signup} />
    <Route path="/create" exact component={CreateDiscussion} />
  </Switch>;
