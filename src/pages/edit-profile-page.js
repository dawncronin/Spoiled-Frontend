import React from 'react'
import { connect } from 'react-redux'

import { setUserGifts } from '../redux/user-actions'

import FormInput from '../components/form-input'
import CustomButton from '../components/custom-button'


import './my-wishlist-page.styles.css'

class EditProfile extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            confirm_password: ''
        }
    }

    handleChange = (e) => {
        const { value, name } = e.target

        this.setState({[name]: value})
    }

    handleClick = (e) => {
        e.preventDefault()

        
    }

    render() {
        return (
            <div>
                {!this.props.currentUser? null :
                <div>
                    <h3> Editing Your Profile </h3>
                    <form>
                        <FormInput label="First Name" placeholder={this.props.currentUser.first_name} value={this.state.first_name} type='text' name='first_name' handleChange={this.handleChange}/>
                        <FormInput label="Last Name" placeholder={this.props.currentUser.last_name} value={this.state.last_name} type='text' name='last_name' handleChange={this.handleChange}/>
                        <FormInput label="Email" placeholder={this.props.currentUser.email} value={this.state.password} type='password' name='password' handleChange={this.handleChange}/>
                        <FormInput label="New Password" placeholder='Password' value={this.state.confirm_password} type='password' name='confirm-password' handleChange={this.handleChange}/>
                        <CustomButton text='Update Profile' handleClick={this.handleClick}/>
                    </form>
                    <img className="profile-picture" src="https://research.cbc.osu.edu/sokolov.8/wp-content/uploads/2017/12/profile-icon-png-898.png" alt="profile"/>
                </div>
                }

            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    loggedIn: state.userReducer.loggedIn,
    loading: state.userReducer.loadingUser,
    currentUser: state.userReducer.currentUser,
    userGifts: state.userReducer.userGifts
})

const mapDispatchToProps = (dispatch) => ({
    setUserGifts: (user_id) => dispatch(setUserGifts(user_id))

})

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)