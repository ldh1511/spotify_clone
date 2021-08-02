import * as constants from '../../constants/actions'
const notificationInitialState = ''
const notification = (state = notificationInitialState, action) => {
    switch (action.type) {
        case constants.ADD_NOTIFICATION:
            return action.payload
        case constants.HIDE_NOTIFICATION:
            return action.payload
        default:
            return state
    }
}
export default notification;