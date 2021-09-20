import React from 'react'
import {useHistory} from 'react-router-dom'
import { auth } from '../config/Config'
import logo from '../public/shop.png'
import {Nav,Navbar,NavDropdown} from "react-bootstrap"
import { AiOutlineShoppingCart } from 'react-icons/ai';
export const Navbar1 = ({user}) => {

    const history = useHistory()

    const  handleLogout =()=>{
        auth.signOut().then(()=>{
            history.push('/login')
        })
    }

    return (

        <>

            <Navbar bg="dark" variant="dark" sticky="top" expand="sm" collapseOnSelect fixed="top" >
                <Navbar.Brand href="/">
                <img src={logo} height="42" width="42" alt="logo"/>
                    MyShop
                </Navbar.Brand>

                <Navbar.Toggle className="coloring" />

                <Navbar.Collapse>
                    <Nav className="container-fluid col-md-10">
                        <NavDropdown title="Products">
                        <NavDropdown.Item href="#products/tea">Tea</NavDropdown.Item>
                        <NavDropdown.Item href="#products/coffee">Coffee</NavDropdown.Item>
                        <NavDropdown.Item href="#products/chocolate">Chocolate</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#products/promo">Promo</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="#blog">Blog</Nav.Link>
                        <Nav.Link href="#about-us">About Us</Nav.Link>
                        <Nav.Link href="#contact-us">Contact Us</Nav.Link>
                        
                    </Nav>
                    <Nav className="mr-auto col-md-3 ">
                        {user&&
                            <>  
                                <Nav.Link href="/cart"><AiOutlineShoppingCart className="mb-1" size={20}/></Nav.Link>
                                <Nav.Link>{user}</Nav.Link>
                                <Nav.Link  onClick={handleLogout}>Logout</Nav.Link>
                            </>
                        }
                        {!user&&
                            <>
                                <Nav.Link href="/login">Login</Nav.Link>
                                <Nav.Link href="/signup">SignUp</Nav.Link>
                            </>
                        }


                    </Nav>
                </Navbar.Collapse>

            </Navbar>
        </>

    )
}
