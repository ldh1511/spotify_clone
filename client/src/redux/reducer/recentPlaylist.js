import * as constants from '../../constants/actions'
const recentPlaylistInitialState =[]
const recentPlaylist = (state = recentPlaylistInitialState, action) => {
    switch (action.type) {
        case constants.GET_RECENT_PLAYLISTS:
            return state
        case constants.GET_RECENT_PLAYLISTS_SUCCESS:
            return action.payload
        default:
            return state
    }
}
export default recentPlaylist;