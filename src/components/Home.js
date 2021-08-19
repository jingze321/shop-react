import React,{useState,useEffect} from 'react'
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { auth, fs } from '../config/Config'
import { Navbar1 } from './Navbar'
import {Products} from './Products'



function Home() {

    function GetUser(){
        const [user,setUser] =useState(null)

        useEffect(()=>{
            auth.onAuthStateChanged(user=>{
                if(user){
                    fs.collection('users').doc(user.uid).get()
                    .then(snapshot => {setUser(snapshot.data().Fullname)})
                }
            })
        },[])
        return user;
    }

    const user =GetUser();

    return (
        <div>
            <Navbar1 user={user}/>
            <Products/>
        </div>
    )
}

export default Home
