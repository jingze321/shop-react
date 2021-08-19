import React,{useState} from 'react'
import { Form, Button, Card, Alert } from "react-bootstrap"
import {auth,fs} from '../config/Config'
import {Link,useHistory} from 'react-router-dom'

export const SignUp = () => {

    const history = useHistory();

    const [fullName,setFullName] =useState('')
    const [email,setEmail] =useState('')
    const [password,setPassword] =useState('')
    const [passwordConfirm,setPasswordConfirm] =useState('')


    //message
    const[error,setError]=useState('')
    const[success,setSuccess] = useState('')

    const handleSingup =(e)=>{
        e.preventDefault();

        if (password !== passwordConfirm) {
            return setError("Passwords do not match")
          }


        auth.createUserWithEmailAndPassword(email,password).then((credentials)=>{
            console.log(credentials)
            fs.collection('users').doc(credentials.user.uid).set({
                Fullname: fullName,
                Email:email,
                Password:password
            })
            .then(()=>{
                setSuccess("SignUp Successful")
                setFullName('')
                setEmail('')
                setPassword('')
                setError('')
                setTimeout(()=>{
                    setSuccess("")
                    history.push('/login')  
                },3000)
    
            }).catch(err=>{setError(err.message)})
        })
        .catch(err=>{
            setError(err.message)
        })
    }

    return (
    <div>

        <Card>
            <Card.Body>
                
                <h2 className="text-center mb-4">Sign Up</h2>

                {success && 
                    <div class="alert alert-success" role="alert">
                        {success}
                    </div>
                }
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
                    <Form.Control type="password"  onChange={e =>{setPasswordConfirm(e.target.value)}} required />
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
      {error && 
        <div class="alert alert-danger" role="alert">
            {error}
        </div>}
    </div>
    )
}
