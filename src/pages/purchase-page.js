import React from 'react'
import { Redirect } from 'react-router-dom'

import StripeCheckoutButton from '../components/stripe-button'

import './purchase-page.styles.css'

const API_ROOT = 'https://spoiled-backend.herokuapp.com/'

class PurchasePage extends React.Component {
    constructor() {
        super()
        this.state = {
            product: {},
            user: {},
            purchased: false
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

    onToken = token => {
        fetch(`${API_ROOT}gifts/${this.props.match.params.giftId}`, {
            method: 'put',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                Accepts: 'application/json',
            },
            body: JSON.stringify({purchased: true})
        })
        alert('Payment Successful')

        this.setState({purchased: true})
    }

    render() {
        return (
            <div>
            <div className="purchase-page">
                {this.state.purchased? <Redirect to="/"/>: ''}
                <h1> Checkout </h1>

                <h3>Purchasing {this.state.product.name} for {this.state.user.first_name}</h3>
                <img src={this.state.product.image} alt="purchase"/>

                <div> Total: ${this.state.product.price}0</div>

                <div className="test">Use card number 4242 4242 4242 4242 and date 10/2022</div>
                <StripeCheckoutButton price={this.state.product.price} onToken={this.onToken}/>
            </div>
            </div>
        )
    }
}

export default PurchasePage