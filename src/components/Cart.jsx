import React,{useState,useEffect} from 'react'
// import { Navbar1 } from './Navbar'
import {auth,fs} from '../config/Config'
import {CartProduct} from './CartProduct'
import { AiOutlineShoppingCart } from 'react-icons/ai';
import StripeCheckout from 'react-stripe-checkout';
import {useHistory} from 'react-router-dom'
import axios from 'axios'

import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


toast.configure();

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
    },[])
    
    //getting qty from cartProducts in a separate array
    const qty = cartProduct.map(CartProduct=>{
        return CartProduct.Quantity;
    })
    // console.log(qty)

    //reducing qty in a single value
    const reducerOfQty =(accumulator,currentValue)=> accumulator + currentValue
    const totalQty =qty.reduce(reducerOfQty,0)
    
    
    //get totalproductprice from cartProducts in a separate array
    const price = cartProduct.map(CartProduct=>{
        return CartProduct.TotalProductPrice
    })

    const reducerOfPrice =(accumulator,currentValue)=> accumulator + currentValue
    const totalPrice =price.reduce(reducerOfPrice,0)


    //charging payment
    const history = useHistory();
    const handleToken= async (token)=>{
        // console.lohandleTokeng(token)
        const cart ={name: 'All Products',totalPrice}
        // console.log(cart)
        const response = await axios.post('http://localhost:8080/checkout',{
            token,
            cart
        })
        // console.log(response);
        let {status}=response.data;
        if (status==="success"){
            
            history.push('/')
            toast.success('Order has been placed successfully',{
                position:'top-right',
                autoClose:5000,
                hideProgressBar:false,
                closeOnClick:true,
                pauseOnHover:false,
                draggable:false,
                progress:undefined,
            })
            const uid = auth.currentUser.uid;
            const carts = await fs.collection('Cart-'+uid).get();
            for (var snap of carts.docs){
                fs.collection('Cart-'+uid).doc(snap.id).delete();
            }
        }else if (status==="error"){
            alert('something went wrong in check up')
        }else{
            alert('404 error')
        }
    }

    let Product;

    const cartProductIncrease =(cartProduct)=>{
        Product = cartProduct;
        Product.Quantity = Product.Quantity +1
        Product.TotalProductPrice = Product.Quantity * Product.Price

        //Update
        auth.onAuthStateChanged(user=>{
            if(user){
                fs.collection("Cart-"+user.uid).doc(cartProduct.ID).update(Product).then(()=>{
                    console.log("Increment Added")
                })
            }else{
                console.log("user not login")
            }
        })
    }

    const cartProductDecrease =(cartProduct)=>{
        Product = cartProduct;
        if (Product.Quantity >1){
            
            Product.Quantity = Product.Quantity -1
            Product.TotalProductPrice = Product.Quantity * Product.Price
        }


        //Update
        auth.onAuthStateChanged(user=>{
            if(user){
                fs.collection("Cart-"+user.uid).doc(cartProduct.ID).update(Product).then(()=>{
                    console.log("Increment Added")
                })
            }else{
                console.log("user not login")
            }
        })
    }


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
                <div className="container mt-5 mb-5">
                    <div className="d-flex justify-content-center row">
                        <div className="col-md-8">
                            <div className="p-2">
                                <h4>Shopping cart <AiOutlineShoppingCart/></h4>
                        <CartProduct cartProduct={cartProduct} cartProductIncrease={cartProductIncrease} cartProductDecrease={cartProductDecrease}/>
                            </div>
                        </div>
                    </div>
                    <div className=" justify-content-end d-flex">
                        <div className="order_total d-flex justify-content-between ">
                            <div className="order_total_content">
                                
                                <div className="order_total_title">Total Quantity:</div>
                                <div className="order_total_amount">{totalQty}</div>
                            </div>

                            <div className="order_total_content ">
                                
                                <div className="order_total_title">Total Price:</div>
                                <div className="order_total_amount">RM{totalPrice}</div>
                            </div>
                        </div>
                    </div>

                    <div className="cart_buttons "> 

                        <StripeCheckout
                            stripeKey='pk_test_51JZr5tB870cjy82EgFLJEBbnW0OH2gCIQwZfd7Swx0xU0kTtrQXY9BtZWpMUqSWNAO9CvI1DaCd49Iww2uvKX47y00CPXvquIz'
                            token={handleToken}
                            billingAddress
                            shippingAddress
                            name='All Products'
                            amount={totalPrice*100}
                        ></StripeCheckout>
                     </div>
                
                </div>
                
            )}
        </>
    )
}
