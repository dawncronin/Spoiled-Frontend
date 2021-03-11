import React from 'react'
import { connect } from 'react-redux'

import { setUserGifts } from '../redux/user-actions'
import MyGiftCard from '../components/my-gift-card'

import edit from '../img/pencil-sharp.svg'

import './my-wishlist-page.styles.css'

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


    render() {
        return (
            <div>
                {!this.props.currentUser? null :
                <div className="about">
                    <h3> Viewing Your Profile <a href="/myWishlist/edit"><img className="edit" src={edit}/></a></h3>
                    <h2>{this.props.currentUser.first_name} {this.props.currentUser.last_name}</h2>
                    <h4> {this.props.currentUser.email} </h4>
                    <img className="profile-picture" src="https://research.cbc.osu.edu/sokolov.8/wp-content/uploads/2017/12/profile-icon-png-898.png" alt="profile"/>
                </div>
                }
                <div className="my-wishlist">
                    { this.props.userGifts.map ( gift => {
                    return <MyGiftCard 
                        key={gift._id} 
                        product_id={gift.product_id}
                        gift_id={gift._id}
                        />
                    })}
                </div>

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