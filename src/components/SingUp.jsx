import React,{useState} from 'react'
import { Form, Button, Card, Alert } from "react-bootstrap"
import {Link} from 'react-router-dom'

export const SignUp = () => {
    const [fullName,setFullName] =useState('')
    const [email,setEmail] =useState('')
    const [password,setPassword] =useState('')

    const[error,setError]=useState('')
    const[success,setSuccess] = useState('')

    const handleSingup =(e)=>{
        e.preventDefault();
        console.log(fullName,email,password)
    }

    return (
    <div>
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Sign Up</h2>
                <Form onSubmit={handleSingup}>
                    <Form.Group>
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control type="text" onChange={e =>{setFullName(e.target.value)}} value={fullName} required/>
                    </Form.Group>
                    <Form.Group id="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email"  onChange={e =>{setEmail(e.target.value)}} value={email} required />
                    </Form.Group>
                    <Form.Group id="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password"  onChange={e =>{setPassword(e.target.value)}} value={password} required />
                    </Form.Group>
                    <Form.Group id="password-confirm">
                    <Form.Label>Password Confirmation</Form.Label>
                    <Form.Control type="password"  required />
                    </Form.Group>
                    <br/>
                    <div>
                        <Button  className="w-100" type="submit">
                        Sign Up
                        </Button>
                        <span>Already have an account?</span>
                        <span><Link to="login">Login</Link></span>
                    </div>

                </Form>
            </Card.Body>
      </Card>
    </div>
    )
}
