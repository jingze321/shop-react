import React,{useState,useEffect} from 'react'
import { auth, fs } from '../config/Config'
// import { Navbar1 } from './Navbar'
import {Products} from './Products'



function Home(props) {
    function GetUserUid(){
        const [uid,setUid]=useState(null)
        useEffect(()=>{
            auth.onAuthStateChanged(user=>{
                if(user){
                    setUid(user.uid)
                }
            })
        },[])
        return uid;
    }

    const uid =GetUserUid()

    // function GetUser(){
    //     const [user,setUser] =useState(null)

    //     useEffect(()=>{
    //         auth.onAuthStateChanged(user=>{ 
    //             if(user){
    //                 fs.collection('users').doc(user.uid).get()
    //                 .then(snapshot => {setUser(snapshot.data().Fullname)})
    //             }else{
    //                 setUser(null)
    //             }
    //         })
    //     },[])
    //     return user;
    // }

    // const user =GetUser();

    const [products,setProducts] = useState([]);

    const getProduct = async()=>{
        const products = await fs.collection('Products').get();
        const productsArray =[]
            for (var snap of products.docs){
                var data = snap.data()
                data.ID =snap.id
                productsArray.push({
                    ...data
                })   
                if (productsArray.length===products.docs.length){
                    setProducts(productsArray)
                }
            }
    }

    useEffect (()=>{
        getProduct();
    },[])

    let Product;
    const addToCart =(product) =>{
        if (uid!==null){
            // console.log(uid)
            Product=product
            Product['Quantity']=1;
            Product['TotalProductPrice']=Product.Quantity*Product.Price
            fs.collection('Cart-'+uid).doc(product.ID).set(Product).then(()=>{
                console.log('Successful Added Into Cart')
                console.log(product.ID)

            })
        }else{
            props.history.push('/login')
        }
    }

    return (
        <div >
            {/* <Navbar1 user={user}/> */}
            <h1>Home Page</h1>
            <br/>
            {products.length <1 &&(
                <div className="container-fluid ">
                    Please wait...
                </div>

            )}
            {products.length >0 &&(
                <div className="container-fluid d-flex justify-content-center">

                    <Products products={products} addToCart={addToCart}/>
                    
                </div>

            )}

            
        </div>
    )
}

export default Home
