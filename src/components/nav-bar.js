import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { logout } from '../redux/user-actions'

import "./nav-bar.styles.css"

const NavBar = (props) => {
    return (
        <nav>
        <div className='nav-bar'>
            <ul>
                <li >
                    <NavLink to="/"><p className="spoiled">Spoiled</p></NavLink>
                </li>
                <li>
                    <NavLink to="/products" >Products</NavLink>
                </li>
                <li>
                    <NavLink to="/users" >People</NavLink>
                </li>

                {props.loggedIn ?
                <div>   
                    <li>
                        <NavLink to="/myWishlist" >My Wishlist</NavLink>
                    </li>              
                    <li>
                        <NavLink to="/" onClick={props.logout} className="logout">Logout</NavLink>
                    </li> 
                </div>
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