import React,{useState} from 'react'
import { Form, Button, Card, Alert } from "react-bootstrap"
import {Link,useHistory} from 'react-router-dom'
import { storage,fs } from '../config/Config'
export const AddProduct = () => {

    const [title,setTitle] = useState('')
    const [description,setDescription] = useState('')
    const [price,setPrice] = useState('')
    const [image,setImage] = useState(null)

    const [imageError,setImageError]=useState('')
    const [uploadError,setUploadError]=useState('')

    const[error,setError]=useState('')
    const[success,setSuccess] = useState('')


    const types = ['image/jpeg', 'image/png', 'images/gif']
    const handleProductImage = (e)=>{

        let selectedFile = e.target.files[0];
        if (selectedFile){
            if (selectedFile&&types.includes(selectedFile.type)){
                setImage(selectedFile)
                setImageError('')

            }else{
                setImage(null);
                setImageError('Image type not supported')
            }
        }else{
            console.log('gg')
        }

    }

    const handleAddProduct=(e)=>{
        e.preventDefault()
        // console.log(title,description,price)
        // console.log(image)

        // Register three observers:
            // 1. 'state_changed' observer, called any time the state changes
            // 2. Error observer, called on failure
            // 3. Completion observer, called on successful completion
        const uploadTask = storage.ref(`products-image/${image.name}`).put(image);
        uploadTask.on('state_changed',snapshot=>{
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =(snapshot.bytesTransferred/snapshot.totalBytes)*100
            console.log(progress)
        },error=>setUploadError(error.message),
        ()=>[
            storage.ref(`products-image`).child(image.name).getDownloadURL()
            .then(url=>{
                fs.collection('Products').add({
                    Title:title,
                    Description:description,
                    Price:Number(price),
                    url
                }).then(()=>{
                    setSuccess("Product Added!")
                    setTitle('')
                    setDescription('')
                    setPrice('')
                    document.getElementById('file').value=''
                    setImageError('')
                    setUploadError('')
                    setTimeout(()=>{
                        setSuccess("")
                    },3000)
                }).catch(err=>{setUploadError(err.message)})
            })
        ])
    }

    return (
        <div>
            <Card>
            <Card.Body>
                
                <h2 className="text-center mb-4">Add New Product</h2>


                    {success && <Alert variant="success">{success}</Alert>}
                <Form onSubmit={handleAddProduct}>
                    <Form.Group id="title">
                        <Form.Label>Product Title</Form.Label>
                        <Form.Control type="text" onChange={(e)=>setTitle(e.target.value)}  required/>
                    </Form.Group>
                    <Form.Group id="description">
                        <Form.Label>Product Description</Form.Label>
                        <Form.Control as="textarea" onChange={(e)=>setDescription(e.target.value)}  aria-label="With textarea" />
                    </Form.Group>
                    <Form.Group id="price">
                        <Form.Label>Product Price</Form.Label>
                        <Form.Control type="number" onChange={(e)=>setPrice(e.target.value)}   required />
                    </Form.Group>
                    {uploadError && <Alert variant="danger">{uploadError}</Alert>}
                    

                    <Form.Group id="file" controlId="formFile" className="mb-3">
                        <Form.Label>Product Image</Form.Label>
                        <Form.Control  type="file" onChange={handleProductImage} className="form-control"/>
                    </Form.Group>

                    {imageError && <Alert variant="danger">{imageError}</Alert>}

                    <br/>
                    <div>
                        <Button  className="w-100" type="submit">
                            Submit
                        </Button>
                    </div>

                </Form>
            </Card.Body>
      </Card>
        </div>
    )
}
