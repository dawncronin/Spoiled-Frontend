import React from 'react'
import { connect } from 'react-redux'

import FormInput from './form-input'
import CustomButton from './custom-button'
import { createUser } from '../redux/user-actions'


class SignUpForm extends React.Component {
    constructor(){
        super()

        this.state = {
            name: '',
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
        this.props.createUser({name: this.state.name,
        email: this.state.email,
        password: this.state.password
        })
    }

    render() {
        return (
            <div>
                <form>
                    <FormInput label='name' type='text' name='name' handleChange={this.handleChange}/>
                    <FormInput label='email' type='email' name='email' handleChange={this.handleChange}/>
                    <FormInput label='password' type='password' name='password' handleChange={this.handleChange}/>
                    <CustomButton text='Sign Up' handleClick={this.handleClick}/>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    createUser: user => dispatch(createUser(user))
})

const mapStateToProps = state => ({
    user: state.userReducer.currentUser
})



export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm)