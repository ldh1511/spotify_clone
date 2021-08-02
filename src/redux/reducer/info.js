import * as constants from '../../constants/actions'
const infoInitialState = {}
const info = (state = infoInitialState, action) => {
    switch (action.type) {
        case constants.SET_USER_TOKEN:
            localStorage.setItem('token', action.payload)
            return state
        case constants.GET_USER_INFO:
            return state
        case constants.GET_USER_INFO_SUCCESS:
            return action.payload
        case constants.GET_USER_INFO_FAILED:
            if(action.payload==='401'){
                localStorage.removeItem('token');
            }
            return {status:action.payload}
        default:
            return state
    }
}
export default info;