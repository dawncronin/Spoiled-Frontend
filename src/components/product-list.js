import React from 'react'
import { connect } from 'react-redux'

import ProductCard from './product-card'
import CustomButton from './custom-button'
import { setUserGifts } from '../redux/user-actions'

import './product-list.styles.css'

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
            this.setState({products: json})
            if (this.props.loggedIn) {
                this.props.setUserGifts(this.props.currentUser._id)
            }
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
            <div >
            <div className="product-list">
                {this.state.products.map( (product) => <ProductCard 
                    key={product._id} 
                    product={product} 
                    gifts={this.props.userGifts}/> 
                )}
            </div>

            <CustomButton text="Next Page" handleClick={this.handleOnClick}/>
            </div>

        )
    }

}
const mapDispatchToProps = (dispatch) => ({
    setUserGifts: user_id => dispatch(setUserGifts(user_id))
})

const mapStateToProps = (state) => ({
    loggedIn: state.userReducer.loggedIn,
    currentUser: state.userReducer.currentUser,
    userGifts: state.userReducer.userGifts
})
export default connect(mapStateToProps, mapDispatchToProps)(ProductList)