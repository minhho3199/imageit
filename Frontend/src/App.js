import React, { Component } from 'react';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faThumbsUp, faComment } from '@fortawesome/free-solid-svg-icons'
import Routes from './Components/Routes/Routes';
library.add(faThumbsUp, faComment);


class App extends Component {
  render() {
    return (
      <div className="App">
        <Routes />
      </div>
    );
  }
}

export default App

