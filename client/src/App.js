import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/home/home';
import Login from './pages/login/login';
import NoPage from './pages/nopage/nopage';
import Terms from './pages/terms_cookies/terms_cookies';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/login" component={Login} />
          <Route path="/home" component={Home} />
          <Route path="/terms" component={Terms} />
          <Route component={NoPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
