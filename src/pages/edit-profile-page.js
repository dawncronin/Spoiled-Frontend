import React from 'react'
import { connect } from 'react-redux'

import { setCurrentUser } from '../redux/user-actions'

import FormInput from '../components/form-input'
import CustomButton from '../components/custom-button'

import './edit-profile-page.styles.css'

const API_ROOT = 'http://localhost:3001/'

let token = localStorage.getItem("token")

const headers = {
    'Content-Type': 'application/json',
    Accepts: 'application/json',
    'Authorization': `Bearer ${token}`,
}

class EditProfile extends React.Component {
    constructor(props) {
        super(props)
        let user = JSON.parse(localStorage.getItem('user'))
        this.state = {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            old_password: '',
            new_password: '',
            old_email: user.email
        }
    }

    handleChange = (e) => {
        const { value, name } = e.target
        this.setState({[name]: value})
    }

    handleClick = (e) => {
        e.preventDefault()

        let updates = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            old_password: this.state.old_password,
            old_email: this.state.old_email

        }
        if (this.state.new_password !== '') {
            updates.password = this.state.new_password
        }

        fetch(`${API_ROOT}users/me`, {
            method: 'put',
            mode: 'cors',
            headers,
            body: JSON.stringify(updates)
        }).then(res => res.json())
        .then (res => {
            console.log(res)
            let password = updates.old_password
            if ( updates.password ){
                password = updates.password
            }

            this.props.setCurrentUser({email: res.email, password })
        })

    
    }

    render() {
        return (
            <div>
                {!this.props.currentUser? null :
                <div className="edit-profile">
                    <h3> Editing Your Profile </h3>
                    <form className="edit-form">
                        <FormInput label="First Name" placeholder={this.props.currentUser.first_name} value={this.state.first_name} type='text' name='first_name' handleChange={this.handleChange}/>
                        <FormInput label="Last Name" placeholder={this.props.currentUser.last_name} value={this.state.last_name} type='text' name='last_name' handleChange={this.handleChange}/>
                        <FormInput label="Email" placeholder={this.props.currentUser.email} value={this.state.email} type='email' name='email' handleChange={this.handleChange}/>
                        <FormInput label="Current Password" placeholder='Password Required' value={this.state.old_password} type='password' name='old_password' handleChange={this.handleChange}/>
                        <FormInput label="New Password" placeholder='Not Required' value={this.state.new_password} type='password' name='new_password' handleChange={this.handleChange}/>
                        <div className="btn-div">
                            <CustomButton text='Update Profile' class="update-profile" handleClick={this.handleClick}/>
                        </div>
                    </form>
                    {/* <img className="profile-picture" src="https://research.cbc.osu.edu/sokolov.8/wp-content/uploads/2017/12/profile-icon-png-898.png" alt="profile"/> */}
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
    setCurrentUser: (email, password) => dispatch(setCurrentUser(email, password))

})

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)