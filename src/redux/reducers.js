import userProfileStateReducer from './reducers/userProfileStateReducer'
import userRequestTypeReducer from './reducers/userRequestType'
import { combineReducers } from 'redux'

const reducers = combineReducers({
    userProfileStateReducer,
    userRequestTypeReducer
})

export default reducers