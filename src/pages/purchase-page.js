import React from 'react'

import CheckoutForm from '../components/checkout-form'

const API_ROOT = 'http://localhost:3001/'

class PurchasePage extends React.Component {
    constructor() {
        super()

        this.state = {
            product: {},
            user: {}
        }
    }

    componentDidMount () {
        fetch(`${API_ROOT}gifts/${this.props.match.params.giftId}`, {
            method: 'get',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                Accepts: 'application/json',
            }
        }).then(res => res.json())
        .then( json => {
            this.setState({ product: json.product,
            user: json.user})
        })
    }

    render() {
        return (
            <div>
                <h1> Checkout </h1>

                <h3>Purchasing {this.state.product.name} for {this.state.user.first_name}</h3>
                <img src={this.state.product.image} alt="purchase"/>

                <p> Total: ${this.state.product.price}0</p>

                <CheckoutForm gift_id={this.props.match.params.giftId}/>
            </div>
        )
    }
}

export default PurchasePage