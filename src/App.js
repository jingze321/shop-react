import React,{useState,useEffect} from 'react'
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Navbar1 } from './components/Navbar'
import {AuthProvider} from './config/Auth'
import { auth, fs } from './config/Config'



import Home from './components/Home'
import {Login} from './components/Login'
import {SignUp} from './components/SingUp'
import {ErrorPage} from './components/ErrorPage'
import {AddProduct} from './components/AddProduct'
import {Cart} from './components/Cart'
import { PrivateRoute } from './components/PrivateRoute'

function App() {
  function GetUser(){
    const [user,setUser] =useState(null)

    useEffect(()=>{
        auth.onAuthStateChanged(user=>{ 
            if(user){
                fs.collection('users').doc(user.uid).get()
                .then(snapshot => {setUser(snapshot.data().Fullname)})
            }else{
                setUser(null)
            }
        })
    },[])
    return user;
}

const user =GetUser();
  return (
    <Router>
      <AuthProvider>
        <Navbar1 user={user}/>

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/signup" component={SignUp}/>
          <Route path="/login" component={Login}/>
          <Route path="/addproduct" component={AddProduct}/>
          <PrivateRoute path="/cart" component={Cart}/>
          <Route component={ErrorPage}/>
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
