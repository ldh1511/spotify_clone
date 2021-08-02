import * as constants from '../../constants/actions'
const contentHomeInitialState = {}
const contentHome = (state = contentHomeInitialState, action) => {
    switch (action.type) {
        case constants.GET_CONTENT_HOME:
            return state
        case constants.GET_CONTENT_HOME_SUCCESS:
            return {
                ...state,
                relatedArtists:action.payload[0],
                categories:action.payload[1],
                categoriesPlaylists:action.payload[2],
            }
        case constants.GET_CONTENT_HOME_FAILED:
            return state
        default:
            return state
    }
}
export default contentHome;