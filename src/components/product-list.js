import React from 'react'
import ProductCard from './product-card'


const API_ROOT = 'http://localhost:3001/'



class ProductList extends React.Component{
    constructor(props){
        super()

        this.state = {
            products: [],
            page: 1
        }
    }

    componentDidMount(){
        const headers = {
            'Content-Type': 'application/json',
            Accepts: 'application/json',
        }

        fetch(`${API_ROOT}products?page=${this.state.page}`, {
            method: 'get',
            mode: 'cors',
            headers
        }).then(res => res.json())
        .then(json => {
            console.log(json)
            this.setState({products: json})
        })
    }


    render() {
        return (
            <div>
                {this.state.products.map( (product) => <ProductCard product={product}/> )}
            </div>
        )
    }

}

export default ProductList