import React from 'react'

import GiftCard from '../components/gift-card'

const API_ROOT = 'https://spoiled-backend.herokuapp.com/'

class UserPage extends React.Component {
    constructor() {
        super()

        this.state = {
            user: null,
            wishlist: []
        }
    }

    componentDidMount() {
        fetch(`${API_ROOT}users/${this.props.match.params.userId}`, {
            method: 'get',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                Accepts: 'application/json',
            }
        }).then(res => res.json())
        .then( json => {
            this.setState({ user: json.user,
            wishlist: json.gifts})
        })
    }


    render() {
        return (
            <div>
                {!this.state.user? 
                <div> loading </div>

                :
                <div className="product-list">
                    <h2>Viewing {this.state.user.first_name}'s Wishlist </h2>

                    {this.state.wishlist.map(gift => {
                        return <GiftCard key= {gift._id} purchased={ gift.purchased} gift_id={gift._id} product_id={gift.product_id}/>
                    })}
                </div>
            }
            </div>
        )
    }

}

export default UserPage