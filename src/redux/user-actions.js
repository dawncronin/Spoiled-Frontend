const API_ROOT = 'http://localhost:3001/'

let token = localStorage.getItem("token")

const headers = {
    'Content-Type': 'application/json',
    Accepts: 'application/json',
    'Authorization': `Bearer ${token}`
}

export const createUser = (user) => {
    return (dispatch) => {
        fetch(`${API_ROOT}users`, {
            method: 'post',
            mode: 'cors',
            headers,
            body: JSON.stringify(user)
        }).then(res => {
            if (res.status === 201) {
                return res.json()
            } else {
                throw new Error()
            }
        })
        .then(json => {
            localStorage.setItem('token', json['token'])
            dispatch({
                type: 'SET_CURRENT_USER',
                payload: json['user']
            })
        })
        .catch(e => {
            dispatch({
                type: 'INVALID_LOGIN',
            })
        })
    }
}

export const setCurrentUser = user => {
    return (dispatch) => {
        dispatch({type: 'LOADING_USER'})
        fetch(`${API_ROOT}users/login`, {
            method: 'post',
            mode: 'cors',
            headers,
            body: JSON.stringify(user)
        }).then(res => res.json())
        .then(json => {
            console.log(json)
            localStorage.setItem('token', json['token'])
            dispatch({
                type: 'SET_CURRENT_USER',
                payload: json['user']
            })
        })
        .catch(e => {
            dispatch({
                type: 'INVALID_LOGIN'
            })
        })
    }
}

export function getCurrentUser() {
    return (dispatch) => {
        dispatch({type: 'LOADING_USER'})
        fetch(`${API_ROOT}users/auth`, {
            mode: 'cors',
            headers,
        }).then(res => {
            console.log(res.status)
            if (res.status === 201) {
                return res.json()
            } else {
                throw new Error()
            }
        })
        .then(user => {
            dispatch({
                type: 'SET_CURRENT_USER',
                payload: user
            })
        })
        .catch (error =>{
            dispatch({
                type: 'LOGOUT',
                payload: null
            })
        })
    }
}

export function setUserGifts(user_id) {
    return (dispatch) => {
        dispatch({type: 'LOADING_USER'})
        fetch(`${API_ROOT}gifts/:${user_id}`, {
            mode: 'cors',
            headers,
        })
        .then(res => res.json())
        .then(gifts => {
            dispatch({
                type: 'SET_USER_GIFTS',
                payload: gifts
            })
        })
    }
}

export const removeError = () => {
    return (dispatch) => {
            dispatch({
            type: 'REMOVE_ERROR',
            payload: null
        })
    }
}

export const logout = () => {
    return (dispatch) => {
        console.log('logout')
        fetch(`${API_ROOT}users/logout`, {
            mode: 'cors',
            method: 'post',
            headers,
        }).then(res => {
            localStorage.removeItem('token')
            dispatch({
                type: 'LOGOUT',
                payload: null
            })
        })
        .catch (error =>{
            localStorage.removeItem('token')
            dispatch({
                type: 'LOGOUT',
                payload: null
            })
        })

    }
}