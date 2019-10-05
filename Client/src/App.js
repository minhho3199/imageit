import React, { Component } from 'react';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faThumbsUp, faComment, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import './App.css';
import Routes from './Components/Routes/Routes';
import {Helmet} from 'react-helmet';
library.add(faThumbsUp, faComment, faUser, faSignOutAlt);


class App extends Component {
  render() {
    return (
      <div className="App">
        <Helmet><title>ImageIt</title></Helmet>
        <Routes />
      </div>
    );
  }
}

export default App

