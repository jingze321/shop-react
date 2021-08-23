import React from 'react'
import { CartProductIndividual } from './CartProductIndividual'
export const CartProduct = ({cartProduct}) => {
    
     return cartProduct.map(cartProduct=>{
            return (
                <CartProductIndividual  key={cartProduct.ID} cartProduct={cartProduct}/>
                
            )          
        })
    
}
