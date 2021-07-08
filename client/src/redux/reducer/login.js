import * as constants from '../../constants/actions'
const loginInitialState = {
    loginToken:null
}
const login = (state = loginInitialState, action) => {
    switch (action.type) {
        case constants.LOGIN:
            return {
                ...state,
                loginToken:action.payload
            }
        case constants.LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                loginToken:null
            }
        default:
            return state
    }
}
export default login;