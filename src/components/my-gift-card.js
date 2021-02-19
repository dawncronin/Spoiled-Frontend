import React from 'react'
import { connect } from 'react-redux'

import CustomButton from './custom-button'
import { setUserGifts } from '../redux/user-actions'

const API_ROOT = 'http://localhost:3001/'

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
        console.log(this.props.product_id, this.state.product._id)
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
                console.log(json, 'json')
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
            <div>
                <h3>{this.state.product.name}</h3>
                <p>${this.state.product.price}0</p>
                <p>{this.state.product.description}</p>
                <img src={this.state.product.image} alt="product"/>

                <CustomButton handleClick={this.removeFromWishlist}
                text='Remove From Wishlist' /> 
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