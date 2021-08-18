import React from 'react'
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Navbar } from './Navbar'
import {Products} from './Products'



function Home() {
    return (
        <div>
            <Navbar/>
            <Products/>
        </div>
    )
}

export default Home
