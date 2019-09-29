import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './pages/home/home';
import Login from './pages/login/login';

function App() {
  return (
    <Router>
      <div className="App">
        <div>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
        </div>
      </div>
    </Router>
  );
}

export default App;
