import * as constants from '../../constants/actions'
const artistInitialState = {}
const artist = (state = artistInitialState, action) => {
    switch (action.type) {
        case constants.GET_ARTIST:
            return state
        case constants.GET_ARTIST_SUCCESS:
            return {
                ...state,
                artistInfo:action.payload[0],
                topTracks:action.payload[1].tracks,
                albums:action.payload[2],
                related:action.payload[3],
            }
        default:
            return state
    }
}
export default artist;