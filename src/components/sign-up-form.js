import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import FormInput from './form-input'
import CustomButton from './custom-button'
import { createUser, removeError } from '../redux/user-actions'

//styles are located in parent sign-in-page

class SignUpForm extends React.Component {
    constructor(){
        super()
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            password:''
        }
    }

    handleChange = (e) => {
        const { value, name } = e.target

        this.setState({[name]: value})
    }

    handleClick = (e) => {
        e.preventDefault()
        this.props.createUser({first_name: this.state.first_name,
        last_name: this.state.last_name,
        email: this.state.email,
        password: this.state.password
        })
    }


    componentWillUnmount() {
        this.props.removeError()
        this.setState({
            first_name: '',
            last_name: '',
            email: '',
            password:'',
            confirm_password: ''
        })
    }

    render() {
        return (
            <div className="sign-up">
                <h3>Sign Up</h3>
                <h5>Create an account to start a wishlist</h5>
                <p className="invalid">{this.props.error? 'Invalid Inputs' : null}</p>
                <form>
                    <FormInput placeholder='First Name' value={this.state.first_name} type='text' name='first_name' handleChange={this.handleChange}/>
                    <FormInput placeholder='Last Name' value={this.state.last_name} type='text' name='last_name' handleChange={this.handleChange}/>
                    <FormInput placeholder='Email' value={this.state.email} type='email' name='email' handleChange={this.handleChange}/>
                    <FormInput placeholder='Password' value={this.state.password} type='password' name='password' handleChange={this.handleChange}/>
                    <FormInput placeholder='Confirm Password' value={this.state.password} type='password' name='confirm-password' handleChange={this.handleChange}/>
                    <CustomButton text='Sign Up' handleClick={this.handleClick}/>
                </form>

                {this.props.user? <Redirect to="/"/> : null}
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    createUser: user => dispatch(createUser(user)),
    removeError: () => dispatch(removeError())
})

const mapStateToProps = state => ({
    user: state.userReducer.currentUser,
    error: state.userReducer.error
})



export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm)