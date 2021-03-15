import React from 'react'
import { connect } from 'react-redux'

import { setUserGifts } from '../redux/user-actions'

import "./gift-card.styles.css"

const API_ROOT = 'https://spoiled-backend.herokuapp.com/'

class GiftCard extends React.Component {
    constructor() {
        super() 

        this.state = {
            product: []
        }
    }

    componentDidMount() {
        fetch(`${API_ROOT}products/${this.props.product_id}`, {
            method: 'get',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                Accepts: 'application/json',
            }
        }).then(res => res.json())
        .then( json => {
            this.setState({ product: json})
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.product_id !== this.state.product._id) {
            fetch(`${API_ROOT}products/${this.props.product_id}`, {
                method: 'get',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    Accepts: 'application/json',
                }
            }).then(res => res.json())
            .then( json => {
                this.setState({ product: json})
            })
        }
    }

    purchaseGift = () => {
    }


    render() {
        return (
            <div className="product-card">
                <img className="product-card-img" src={this.state.product.image} alt="product"/>
                <h3>{this.state.product.name}</h3>
                <p className="product-card-price">${this.state.product.price}0</p>
                <p className="product-card-desc">{this.state.product.description}</p>
                {this.props.purchased? 
                    <div className="on-your-wishlist">This gift has been purchased</div>
                    :
                    <a className="btn purchase-gift" href={`/purchase/${this.props.gift_id}`}>Purchase Gift</a>
                }
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    setUserGifts: user_id => dispatch(setUserGifts(user_id))
})

const mapStateToProps = (state) => ({
    currentUser: state.userReducer.currentUser
})

export default connect(mapStateToProps, mapDispatchToProps)(GiftCard)