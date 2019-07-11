import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import MoviesList from './MoviesList';
import MovieDetails from './MovieDetails';
import { Router } from "@reach/router"
import './App.css';
class App extends Component {
  render() {
    return (
      <div className='App'>
        <Router>
          <MoviesList path="/" />
          <MovieDetails path="MovieDetails" />
        </Router>
      </div>

    )
  }
}
export default App;
