import types from "../types";

const initialState = {
    loading: false,
    loggedIn: false
}

export const authReducer = (state = initialState, action ) => {
    console.log('action type>>>>',action.type)
    switch(action.type) {
        case types.REGISTER_START :
        case types.LOGIN_START:
        case types.FORGOT_START:
        case types.OTP_START:
        case types.RESET_START:
        case types.SOCIAL_LOGIN_START:
            return {
                ...state, 
                loading: true
            }
        case types.AUTH_SUCCESS:
            return {
                ...state,
                loading: false
            }
        case types.AUTH_FAIL :
            return {
                ...state,
                loading: false
            }
        case types.SET_USER:
            return {
                ...state,
                loggedIn: action.data
            }
        default:
            return state
    }
}