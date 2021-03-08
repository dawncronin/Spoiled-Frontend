import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import FormInput from './form-input'
import CustomButton from './custom-button'
import { setCurrentUser } from '../redux/user-actions'

//styles are located in parent sign-in-page

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
            <div className="sign-in">
                <h3>Sign In</h3>
                <p className="invalid">{this.props.error? 'Invalid Inputs' : null}</p>
                <form>
                    <FormInput placeholder='Email' type='email' value={`${this.state.email}`} name='email' handleChange={this.handleChange}/>
                    <FormInput placeholder='Password' type='password' value={`${this.state.password}`} name='password' handleChange={this.handleChange}/>
                    <CustomButton text='Sign In' handleClick={this.handleClick}/>
                </form>
                {this.props.user? <Redirect to="/"/> : null}
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