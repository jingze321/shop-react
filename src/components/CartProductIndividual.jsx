import React,{useState} from 'react'
import { BsTrash } from 'react-icons/bs';
import { AiFillPlusCircle,AiFillMinusCircle } from 'react-icons/ai';
import {auth,fs} from '../config/Config'

export const CartProductIndividual = ({cartProduct,cartProductIncrease,cartProductDecrease}) => {
    // const [productQuantity,setProductQuantity]=useState(cartProduct.Quantity)

    const handleCartIncrease =()=>{
        cartProductIncrease(cartProduct)
    }
    const handleCartDecrease=()=>{
        cartProductDecrease(cartProduct)
    }
    const handleProductDelete=()=>{
        auth.onAuthStateChanged(user=>{
            if(user){
                fs.collection('Cart-'+user.uid).doc(cartProduct.ID).delete().then(()=>{
                    console.log('Delete Successful')
                })
            }
        })

    }
    
    return (
        <div className="d-flex bd-highlight align-items-center p-2 bg-white mt-4 px-3 rounded cart ">
            <div className="col-3">
                <img className="rounded" src={cartProduct.url} width="70"/>
            </div>
            <div className=" col-3 " >
                <h4 className="font-weight-bold">{cartProduct.Title}</h4>
                <div className="d-flex flex-row product-desc">
                    <div className="size mr-1"><span className="font-weight-bold">{cartProduct.Description}</span></div>
                </div>
            </div>
            <div className=" col-3 d-flex align-items-center">
                <AiFillMinusCircle onClick={handleCartDecrease}/>
                    <input type="number" value={cartProduct.Quantity}  min="1" max="99" className="numberInput"/>
                <AiFillPlusCircle onClick={handleCartIncrease}/>
            </div>
            <div className="col-2">
                <h5 className="text-grey">RM {cartProduct.Price}</h5>
                <h5 className="text-grey">RM {cartProduct.TotalProductPrice}</h5>
            </div>
            <div className="col-2 "><BsTrash onClick={handleProductDelete}/></div>
        </div>

    )
}
