import React from 'react'
import { connect } from 'react-redux'

import { setUserGifts } from '../redux/user-actions'

import './user-card.styles.css'

class UserCard extends React.Component {
    constructor() {
        super() 

        this.state = {
        }
    }

    render() {
        let { first_name, last_name, _id } = this.props.user
        return (
            <div className="user-card">
                <h3>{first_name} {last_name}</h3>

                <a href={`/users/${_id}`}>View Wishlist</a>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    setUserGifts: user_id => dispatch(setUserGifts(user_id))
})

const mapStateToProps = (state) => ({
    currentUser: state.userReducer.currentUser
})

export default connect(mapStateToProps, mapDispatchToProps)(UserCard)