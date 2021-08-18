import React,{useState} from 'react'
import { Form, Button, Card, Alert } from "react-bootstrap"
import {Link} from 'react-router-dom'
export const Login = () => {

    const [email,setEmail] =useState('')
    const [password,setPassword] =useState('')

    const[error,setError]=useState('')
    const[success,setSuccess] = useState('')

    const handleLogin =(e)=>{
        e.preventDefault();
        console.log(email,password)
    }
    return (
        <div>
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Sign Up</h2>
                <Form onSubmit={handleLogin}>

                    <Form.Group id="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" onChange={e =>{setEmail(e.target.value)}} value={email} required />
                    </Form.Group>
                    <Form.Group id="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" onChange={e =>{setPassword(e.target.value)}} value={password}  required />
                    </Form.Group>

                    <br/>
                    <div>
                        <Button  className="w-100" type="submit">
                        Sign Up
                        </Button>
                        <span>Dont have an account?</span>
                        <span><Link to="/signup">Sign Up</Link></span>
                    </div>

                </Form>
            </Card.Body>
      </Card>
    </div>
    )
}
