import React from 'react'

const ProductCard = ({ product: { id, name , price, description, image}}) => {

    return (
        <div key={id}>
            <h3>{name}</h3>
            <p>${price}0</p>
            <p>{description}</p>
            <img src={image} alt="product"/>
        </div>
    )
}

export default ProductCard