import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'


import CustomButton from './custom-button'
import { setUserGifts } from '../redux/user-actions'

const API_ROOT = 'http://localhost:3001/'


class ProductCard extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            redirect: false
        }
    }

    handleLoggedInClick = () => {
        fetch(`${API_ROOT}gifts`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                Accepts: 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({user_id: this.props.currentUser._id,
            product_id: this.props.product._id})  
        }).then( () => {
            this.props.setUserGifts(this.props.currentUser._id)
        })
    }

    handleLoggedOutClick = () => {
        this.setState({redirect: true})
    }

    render() {
        let added = false
        if (this.props.loggedIn && this.props.gifts) {
            added = this.props.gifts.find(gift => gift.product_id === this.props.product._id)
        }

        return (
            <div className={`product-card ${added? 'added' : ''}`} key={`${this.props.product._id}`}>
                <h3>{this.props.product.name}</h3>
                <p>${this.props.product.price}0</p>
                <p>{this.props.product.description}</p>
                <img src={this.props.product.image} alt="product"/>
                {added? 'added' : ''}
                {this.props.loggedIn? 
                    <CustomButton text="Add to wishlist" handleClick={this.handleLoggedInClick}/> :
                    <CustomButton text="Sign in to add to wishlist" handleClick={this.handleLoggedOutClick} />
            }
            {this.state.redirect? <Redirect to="/signin"/> : null}
            </div>
        )
    }

}

const mapStateToProps = (state) => ({
    loggedIn: state.userReducer.loggedIn,
    currentUser: state.userReducer.currentUser,
    userGifts: state.userReducer.userGifts
})

const mapDispatchToProps = (dispatch) => ({
    setUserGifts: user_id => dispatch(setUserGifts(user_id))
})


export default connect(mapStateToProps, mapDispatchToProps)(ProductCard)