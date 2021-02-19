import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'


import { setUserGifts } from '../redux/user-actions'
import MyGiftCard from '../components/my-gift-card'


class MyWishListPage extends React.Component {
    constructor() {
        super()

        this.state = {
        }
    }

    componentDidMount() {
        if (this.props.loggedIn) {
            this.props.setUserGifts(this.props.currentUser._id)
        }
    }

    // componentDidUpdate(prevState, prevProps) {
    //     if (this.props.loggedIn !== prevProps.loggedIn && this.props.currentUser) {
    //         this.props.setUserGifts(this.props.currentUser._id)
    //     }
    // }

    render() {
        return (
            <div>
                My Wishlist

                { this.props.userGifts.map ( gift => {
                   return <MyGiftCard 
                    key={gift._id} 
                    product_id={gift.product_id}
                    gift_id={gift._id}
                    />
                })}
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

export default connect(mapStateToProps, mapDispatchToProps)(MyWishListPage)