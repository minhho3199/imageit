import React from 'react';
import {Route, Switch} from 'react-router-dom';
import HomePage from '../HomePage/HomePage';
import Login from '../LogIn/LogIn';
import CreateDiscussion from '../CreateDiscussion/CreateDiscussion';
import Signup from '../SignUp/SignUp'

export default () =>
  <Switch>
    <Route path="/" exact component={HomePage} />
    <Route path="/login" exact component={Login} />
    <Route path="/signup" exact component={Signup} />
    <Route path="/create" exact component={CreateDiscussion} />
  </Switch>;
