import {combineReducers, createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'


import userReducer from './user-reducer'



const rootReducer = combineReducers({
    userReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

    

const store = createStore(
    rootReducer, 
    composeEnhancers(applyMiddleware(thunk))
    )
export default store