import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { logout } from '../redux/user-actions'



const NavBar = (props) => {
    return (
        <nav>
        <div className='nav-bar'>
            <ul>
                <li>
                    <NavLink to="/home">Spoiled</NavLink>
                </li>
                <li>
                    <NavLink to="/products">Products</NavLink>
                </li>
                <li>
                    <NavLink to="/users">People</NavLink>
                </li>

                {props.loggedIn ?                
                    <li>
                        <NavLink to="/" onClick={props.logout}>Logout</NavLink>
                    </li> 
                    :
                    <li>
                        <NavLink to="/signin">Sign In</NavLink>
                    </li>
                }

            </ul>
        </div>
    </nav>
    )
}

const mapStateToProps = (state) => ({
    loggedIn: state.userReducer.loggedIn
})

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(logout())
})
export default connect(mapStateToProps, mapDispatchToProps)(NavBar)