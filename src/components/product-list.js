import React from 'react'

import ProductCard from './product-card'
import CustomButton from './custom-button'


const API_ROOT = 'http://localhost:3001/'



class ProductList extends React.Component{
    constructor(props){
        super()

        this.state = {
            products: [],
            page: 1,
            headers:{
                'Content-Type': 'application/json',
                Accepts: 'application/json',
            }
        }
    }


    componentDidMount(){
        fetch(`${API_ROOT}products?page=${this.state.page}`, {
            method: 'get',
            mode: 'cors',
            headers: this.state.headers
        }).then(res => res.json())
        .then(json => {
            console.log(json)
            this.setState({products: json})
        })
    }

    handleOnClick = () => {
        console.log('click')
        fetch(`${API_ROOT}products?page=${this.state.page + 1}`, {
            method: 'get',
            mode: 'cors',
            headers: this.state.headers
        }).then(res => res.json())
        .then( json => this.setState({products: json}))
        this.setState((state, props) => {
            return { ...state, page: state.page + 1}
        })
        window.scrollTo(0, 0)
    }


    render() {
        return (
            <div className="ProductListPage">
            <div>
                {this.state.products.map( (product) => <ProductCard product={product}/> )}
            </div>

            <CustomButton text="Next Page" handleClick={this.handleOnClick}/>
            </div>

        )
    }

}

export default ProductList