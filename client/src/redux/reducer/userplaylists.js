import * as constants from '../../constants/actions'
const userPlaylistsInitialState = {}
const userPlaylists = (state = userPlaylistsInitialState, action) => {
    switch (action.type) {
        case constants.GET_USER_PLAYLISTS:
            return state
        case constants.GET_USER_PLAYLISTS_SUCCESS:
            return action.payload
        default:
            return state
    }
}
export default userPlaylists;