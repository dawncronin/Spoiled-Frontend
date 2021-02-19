import React from 'react' 

import UserCard from '../components/user-card'
const API_ROOT = 'http://localhost:3001/'

class UsersPage extends React.Component {
    constructor() {
        super()

        this.state = {
            users: []
        }
    }

    componentDidMount() {
        fetch(`${API_ROOT}users`, {
            method: 'get',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                Accepts: 'application/json',
            }
        }).then(res => res.json())
        .then( json => {
            console.log(json)
            this.setState({ users: json.users})
        })
    }

    render() {
        return (
            <div>
               {this.state.users.map(user => {
                   return <UserCard 
                    key={user._id}
                    user={user}
                   />
               })}
    
            </div>
        )
    }
}

export default UsersPage
