import * as constants from '../../constants/actions'
const tracksInitialState = {
    tracksInPlaylist:[]
}
const tracks = (state = tracksInitialState, action) => {
    switch (action.type) {
        case constants.GET_TRACKS_PLAYLIST:
            return state
        case constants.GET_TRACKS_PLAYLIST_SUCCESS:
            return{
                ...state,
                playlistInfo:action.payload[0],
                tracksInPlaylist:action.payload[1]
            }
        default:
            return state
    }
}
export default tracks;