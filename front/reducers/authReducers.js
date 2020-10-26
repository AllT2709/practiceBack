import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL,IS_LOGGEDIN } from '../actions/types'

const initialState = {
    newUser: {},
    user: {},
    isAuth: false,
    isRegistered: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case REGISTER_SUCCESS:
            return {
                ...state,
                newUser: action.payload,
                isRegistered: true
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload,
                isAuth: true,
                isRegistered: true
            };
        case IS_LOGGEDIN:
        case REGISTER_FAIL:
            return {
                ...state,
                isRegistered: false,
            };
        case LOGIN_FAIL:
            return {
                ...state,
                isRegistered: false,
                isAuth: false
            };
        default:
            return state;
    }
}
