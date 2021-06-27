import * as constants from '../../constants/actions'
const artistInitialState = {}
const artist = (state = artistInitialState, action) => {
    switch (action.type) {
        case constants.GET_ARTIST:
            return state
        case constants.GET_ARTIST_SUCCESS:
            let singles=action.payload[2].items.filter(item=>item.album_type==='single');
            return {
                ...state,
                artistInfo:action.payload[0],
                topTracks:action.payload[1].tracks,
                albums:action.payload[2],
                singles:singles,
                related:action.payload[3],
            }
        case constants.GET_ARTIST_FAILED:
            return state
        case constants.GET_ALBUM_TRACK:
            return state
        case constants.GET_ALBUM_TRACK_SUCCESS:
            return{
                ...state,
                albumtracks:action.payload
            }
        case constants.GET_ALBUM_TRACK_FAILED:
            return state
        default:
            return state
    }
}
export default artist;