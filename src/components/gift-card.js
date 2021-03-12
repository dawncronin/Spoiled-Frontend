import React from 'react'
import { connect } from 'react-redux'

import { setUserGifts } from '../redux/user-actions'

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
            <div>
                <h3>{this.state.product.name}</h3>
                <p>${this.state.product.price}0</p>
                <p>{this.state.product.description}</p>
                <img src={this.state.product.image} alt="product"/>
                {this.props.purchased? 
                    <p>This gift has been purchased</p>
                    :
                    <a href={`/purchase/${this.props.gift_id}`}>Purchase Gift</a>
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