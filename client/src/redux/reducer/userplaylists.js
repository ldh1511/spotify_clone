import * as constants from '../../constants/actions'
const userPlaylistsInitialState = {}
const userPlaylists = (state = userPlaylistsInitialState, action) => {
    switch (action.type) {
        case constants.GET_USER_PLAYLISTS:
            return state
        case constants.GET_USER_PLAYLISTS_SUCCESS:
            return action.payload
        case constants.GET_USER_PLAYLISTS_FAILED:
            return state
        case constants.CREATE_PLAYLIST:
            return state
        case constants.CREATE_PLAYLIST_SUCCESS:
            return action.payload
        case constants.CREATE_PLAYLIST_FAILED:
            return state
        default:
            return state
    }
}
export default userPlaylists;