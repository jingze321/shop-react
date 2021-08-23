import React,{useState,useEffect} from 'react'
// import { Navbar1 } from './Navbar'
import {auth,fs} from '../config/Config'
import {CartProduct} from './CartProduct'
import { AiOutlineShoppingCart } from 'react-icons/ai';

export const Cart = () => {
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

    const [cartProduct,setCartProduct]=useState([])
    useEffect(()=>{
        auth.onAuthStateChanged(user=>{
            if(user){
                fs.collection('Cart-'+user.uid).onSnapshot(
                    snapshot=>{
                        const newCartProduct = snapshot.docs.map(
                            (doc)=>({
                                ID:doc.id,
                                ...doc.data()
                        }))
                        setCartProduct(newCartProduct)
                    }
                )
            }else{
                
            }
        })
    })
    return (
        <>
            {/* <Navbar1 user={user}/> */}
            <br/>
            {cartProduct.length <1 &&(
                <div className="container-fluid">
                    No product in your cart
                </div>
            )}
            {cartProduct.length >0 &&(
                <div class="container mt-5 mb-5">
                    <div class="d-flex justify-content-center row">
                        <div class="col-md-8">
                            <div class="p-2">
                                <h4>Shopping cart <AiOutlineShoppingCart/></h4>
                        <CartProduct cartProduct={cartProduct}/>
                            </div>
                        </div>
                    </div>
                </div>
                
            )}
        </>
    )
}
