import React from 'react'
import { connect } from 'react-redux'

import FormInput from './form-input'
import CustomButton from './custom-button'
import { setCurrentUser } from '../redux/user-actions'


class SignInForm extends React.Component {
    constructor(){
        super()

        this.state = {
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
        this.props.setCurrentUser({
        email: this.state.email,
        password: this.state.password
        })
    }

    render() {
        return (
            <div>
                <form>
                    <FormInput label='email' type='email' name='email' handleChange={this.handleChange}/>
                    <FormInput label='password' type='password' name='password' handleChange={this.handleChange}/>
                    <CustomButton text='Sign In' handleClick={this.handleClick}/>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
})

const mapStateToProps = state => ({
    user: state.userReducer.currentUser
})



export default connect(mapStateToProps, mapDispatchToProps)(SignInForm)