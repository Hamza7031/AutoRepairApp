import { SET_USER_IN_REDUX, GET_USER_PROFILE } from '../actions'

const initialState = null

const userProfileStateReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_IN_REDUX: {
            state = action.payload
            return state
        }
        case GET_USER_PROFILE: {
            return state
        }
        default: {
            return state
        }
    }
}

export default userProfileStateReducer