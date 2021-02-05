import React from 'react'
// import { connect } from 'react-redux'
import { 
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import Home from './pages/home-page'
import Products from './pages/products-page'
import Users from './pages/users-page'
import UserPage from './pages/user-page'
import SignIn from './pages/sign-in-page'


import './App.css';

function App() {
  return (
    <Router>
    <div className="App">
      <header className="App-header">
        <p>
          Spoiled Meow
        </p>
      </header>

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/products">
          <Products />
        </Route>
        <Route path="/signin">
          <SignIn />
        </Route>
        <Route path={`/users/:userId`}>
                <UserPage />
            </Route>
        <Router path="/users">
          <Users />
        </Router>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
