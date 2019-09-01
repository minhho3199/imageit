import React from 'react';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faThumbsUp, faComment } from '@fortawesome/free-solid-svg-icons'
import Logo from "./Components/Header/Logo/Logo";
import Routes from './Components/Routes/Routes';
library.add(faThumbsUp, faComment);

function App() {
    return (
      <div className="App">
          <Logo></Logo>
          <Routes />
      </div>
    )
}

export default App

