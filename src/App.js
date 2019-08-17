import React from 'react';
import './App.css';
import HomePage from "./Components/HomePage/HomePage"
import { library } from '@fortawesome/fontawesome-svg-core'
import { faThumbsUp, faComment } from '@fortawesome/free-solid-svg-icons'

library.add(faThumbsUp, faComment);

function App() {
  return (
    <div className="App">
      <HomePage />
    </div>
  )
}

export default App

