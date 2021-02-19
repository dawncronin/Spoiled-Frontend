import React from 'react'

const API_ROOT = 'http://localhost:3001/'

class PurchasePage extends React.Component {
    constructor() {
        super()

        this.state = {

        }
    }

    componentDidMount () {
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

    render() {
        return (
            <div>
                purchase page {this.props.match.params.giftId}
            </div>
        )
    }
}

export default PurchasePage