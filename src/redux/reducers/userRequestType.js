import { SET_USER_REQUEST_TYPE, GET_USER_REQUEST_TYPE } from '../actions'

const initialState = 'Mechanic'

const userRequestTypeReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_REQUEST_TYPE: {
            state = action.payload
            return state
        }
        case GET_USER_REQUEST_TYPE: {
            return state
        }
        default: {
            return state
        }
    }
}

export default userRequestTypeReducer