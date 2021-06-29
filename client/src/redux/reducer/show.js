import * as constants from '../../constants/actions'
const showInitialState = {}
const show = (state = showInitialState, action) => {
    switch (action.type) {
        case constants.GET_SAVED_SHOWS:
            return state
        case constants.GET_SAVED_SHOWS_SUCCESS:
            return {
                ...state,
                savedShows: action.payload
            }
        case constants.GET_SAVED_SHOWS_FAILED:
            return state
        default:
            return state
    }
}
export default show