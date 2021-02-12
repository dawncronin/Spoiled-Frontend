

const INITIAL_STATE = {
    currentUser: null,
    loadingUser: false,
    error: false,
    loggedIn: false
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_CURRENT_USER':
            return {
                ...state,
                loadingUser: false,
                currentUser: action.payload,
                loggedIn: true
            }
        case 'LOADING_USER':
            return {
                ...state,
                loadingUser: true,
            }
        case 'INVALID_LOGIN':
            return {
                ...state,
                error: true,
                loadingUser: false,
                loggedIn: false
            }
        case 'REMOVE_ERROR':
            return {
                ...state,
                error: false
            }
        case 'LOGOUT':
            return {
                ...state,
                currentUser: null,
                loggedIn: false
            }
        default:
            return state;
    }
}

export default userReducer