import React from 'react'
import { connect } from 'react-redux'

import CustomButton from './custom-button'
import { setUserGifts } from '../redux/user-actions'

import './my-gift-card.styles.css'

const API_ROOT = 'https://spoiled-backend.herokuapp.com/'

class MyGiftCard extends React.Component {
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

    removeFromWishlist = () => {
        fetch(`${API_ROOT}gifts/${this.props.gift_id}`, {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                Accepts: 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        }).then( () => {
            this.props.setUserGifts(this.props.currentUser._id)
        })
    }


    render() {
        return (
            <div className="my-gift-card">
                <img src={this.state.product.image} alt="product"/>
                <h3>{this.state.product.name}</h3>
                <p>${this.state.product.price}0</p>
                <p>{this.state.product.description}</p>
                {this.props.purchased? 
                <p> This gift has been purchased!</p> :
                <CustomButton class="remove-from-wishlist" handleClick={this.removeFromWishlist}
                text='Remove From Wishlist' /> 
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

export default connect(mapStateToProps, mapDispatchToProps)(MyGiftCard)