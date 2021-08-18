import React from 'react'
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './components/Home'
import {Login} from './components/Login'
import {SignUp} from './components/SingUp'
import {ErrorPage} from './components/ErrorPage'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/signup" component={SignUp}/>
        <Route path="/login" component={Login}/>
        <Route component={ErrorPage}/>
      </Switch>
    </Router>
  );
}

export default App;
