import React from 'react'
import { connect } from 'react-redux'

import ProductCard from './product-card'
import CustomButton from './custom-button'
import { setUserGifts } from '../redux/user-actions'

import './product-list.styles.css'

const API_ROOT = 'https://spoiled-backend.herokuapp.com/'

class ProductList extends React.Component{
    constructor(){
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

    handlePageIncrease = () => {
        fetch(`${API_ROOT}products?page=${this.state.page + 1}`, {
            method: 'get',
            mode: 'cors',
            headers: this.state.headers
        }).then(res =>  res.json())
        .then( json => this.setState({products: json}))
        this.setState((state, props) => {
            return { ...state, page: state.page + 1}
        })
        window.scrollTo(0, 0)
    }

    handlePageDecrease = () => {
        fetch(`${API_ROOT}products?page=${this.state.page - 1}`, {
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

    sortProducts = (e) => {
        fetch(`${API_ROOT}products?sort=${e.target.value}`, {
            method: 'get',
            mode: 'cors',
            headers: this.state.headers
        }).then(res => res.json())
        .then( json => this.setState({products: json}))
    }


    render() {
        return (
            <div>
            <div className="product-list">
                <div className="custom-select">
                    <select onChange={this.sortProducts}>
                        <option selected disabled hidden> Sort </option>
                        <option value="low"> Low Price</option>
                        <option value="high">High Price</option>
                        <option value="alphabet"> A to Z </option>
                    </select>
                </div>

                {this.state.products.map( (product) => <ProductCard 
                    key={product._id} 
                    product={product} 
                    gifts={this.props.userGifts}/> 
                )}
            </div>
            {!this.state.products.length? null :
            <div className="product-page-footer">
                <div className='page'> Page {this.state.page} </div>
                {this.state.page <= 1? null:
                    <CustomButton text="Prev Page" handleClick={this.handlePageDecrease}/>
                }
                <CustomButton text="Next Page" handleClick={this.handlePageIncrease}/>
            </div>
            }
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