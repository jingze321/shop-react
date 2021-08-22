import React from 'react'
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './components/Home'
import {Login} from './components/Login'
import {SignUp} from './components/SingUp'
import {ErrorPage} from './components/ErrorPage'
import {AddProduct} from './components/AddProduct'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/signup" component={SignUp}/>
        <Route path="/login" component={Login}/>
        <Route path="/addproduct" component={AddProduct}/>
        <Route component={ErrorPage}/>
      </Switch>
    </Router>
  );
}

export default App;
