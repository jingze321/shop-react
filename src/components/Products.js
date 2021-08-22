import React from 'react'
import { Product } from './Product'


export const Products = ({products,addToCart}) => {
    // console.log(products)

    // return products.map((product)=>{
            
    //     <Product key={product.ID} product={product}/>
    // })           
    
    return(
        <div>
            {products.map(product=>{
                return (
                    <Product key={product.ID} product={product}
                    addToCart={addToCart}
                    />
                )          
            })} 
        </div>


    )

    
}
