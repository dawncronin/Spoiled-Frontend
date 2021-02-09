import {combineReducers, createStore} from 'redux'

import userReducer from './user-reducer'



const rootReducer = combineReducers({
    userReducer
})

const store = createStore(
    rootReducer, 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store