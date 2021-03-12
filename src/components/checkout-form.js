import React from 'react'

import CustomButton from './custom-button'
import FormInput from './form-input'

const API_ROOT = 'https://spoiled-backend.herokuapp.com/'

class CheckoutForm extends React.Component {
    constructor() {
        super()

        this.state = {
            name: "",
            email: "",
            credit_card: "",
            credit_date: "",
            credit_ccv: "",
            purchased: false,
            error: false

        }
    }

    handleChange = (e) => {
        const { value, name } = e.target
        this.setState({[name]: value})
    }

    handleSubmit = (e) => {
        e.preventDefault()
        fetch(`${API_ROOT}gifts/${this.props.gift_id}`, {
            method: 'PATCH',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                Accepts: 'application/json',
            },
            body: JSON.stringify({
                purchased: true
            })
        })
    }


    render() {
        return (
            <div> 
                <form>
                    <FormInput type="text" name="name"  placeholder="Name" handleChange={this.handleChange}/>
                    <FormInput type="email" name="email" placeholder="Email" handleChange={this.handleChange}/>
                    <FormInput type="text" name="credit_card" placeholder="Card Number" handleChange={this.handleChange}/>
                    <FormInput type="text" name="credit_date"placeholder="MM / YY" handleChange={this.handleChange}/>
                    <FormInput type="text" name="credit_ccv"placeholder="CCV" handleChange={this.handleChange}/>
                    <CustomButton text="Purchase" handleClick={this.handleSubmit}/>
                </form>
            </div>
        )
    }

}


export default CheckoutForm