import React from 'react'

export const Product = ({product,addToCart}) => {
    // console.log(product)
    const handleAddCart =()=>{
        addToCart(product);
    }
    return (
            <div className="product " >
                <div >
                    < img src={product.url} alt={product.Title} className="product-image"/>
                </div>
                <div className="product-text title ">{product.Title}</div>
                <div className="product-text description">{product.Description}</div>
                <div className="product-text price">RM <span>{product.Price}</span></div>
                <div className="btn btn-danger btn-md cart-btn" onClick={handleAddCart} >Add to Cart</div>
                
            </div>
    )
}
