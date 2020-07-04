import React from 'react';
import './App.css';
import { Route, Switch, Link } from 'wouter';
import Home from 'pages/Home';
import Detail from 'pages/Detail';

function App() {

  return (
    <div className="App">
      <div className="App-content">
        <h1>Welcome to the blog posts app</h1>
        <Switch>
          <Route
            path='/'
            component={Home} />
          <Route
            path='/post/:postId'
            component={Detail} />
          <Route
            path="/:rest*"
            component={() => <><h2>Page not found</h2><Link to='/'>Go Home</Link></>} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
