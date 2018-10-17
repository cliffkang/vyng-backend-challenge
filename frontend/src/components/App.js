import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Homepage from './Homepage';
import Header from './Header';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Router>
          <Switch>
            <Route path='/' component={ Homepage } />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
