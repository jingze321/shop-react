import React,{useState,useEffect} from 'react'
import { BsTrash } from 'react-icons/bs';
import { AiFillPlusCircle,AiFillMinusCircle } from 'react-icons/ai';


export const CartProductIndividual = ({cartProduct}) => {
    const [productQuantity,setProductQuantity]=useState(cartProduct.Quantity)

    function HandleCount(count){


                    
            if (productQuantity>0 && productQuantity<100){
                setProductQuantity(productQuantity+count)   
            }else if(productQuantity<2){
                setProductQuantity(1)
            }
            else if(productQuantity>99){
                setProductQuantity(99)
            }else {
                setProductQuantity(1)
            }

     
    }
    
    
    return (
        <div className="d-flex bd-highlight align-items-center p-2 bg-white mt-4 px-3 rounded cart ">
            <div className="col-3">
                <img className="rounded" src={cartProduct.url} width="70"/>
            </div>
            <div className=" col-3 " >
                <h4 className="font-weight-bold">{cartProduct.Title}</h4>
                <div className="d-flex flex-row product-desc">
                    <div className="size mr-1"><span classNameName="font-weight-bold">{cartProduct.Description}</span></div>
                </div>
            </div>
            <div className=" col-3 d-flex align-items-center">
                <AiFillMinusCircle onClick={()=>HandleCount(-1)}/>
                    <input type="number" value={productQuantity} onChange={(e)=>HandleCount(e.target.valueAsNumber)} min="1" max="99" className="numberInput"/>
                <AiFillPlusCircle onClick={()=>HandleCount(1)}/>
            </div>
            <div className="col-2">
                <h5 className="text-grey">RM {cartProduct.Price}</h5>
            </div>
            <div className="col-2 "><BsTrash/></div>
        </div>

    )
}
