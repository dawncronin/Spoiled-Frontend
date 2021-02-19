import React from 'react'

import GiftCard from '../components/gift-card'

const API_ROOT = 'http://localhost:3001/'

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
            console.log(json)
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
                <div>
                    {this.state.user.first_name}'s page

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