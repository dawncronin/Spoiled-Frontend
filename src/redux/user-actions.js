const API_ROOT = 'http://localhost:3001/'

let token = localStorage.getItem("token")

const headers = {
    'Content-Type': 'application/json',
    Accepts: 'application/json',
    'Authroization': token
}

export const createUser = (user) => {
    return ({
    type: 'CREATE_USER',
    payload: user
    })
}

export const setCurrentUser = user => ({
    type: 'SET_CURRENT_USER',
    payload: user
})