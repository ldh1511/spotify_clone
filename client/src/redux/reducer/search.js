import * as constants from '../../constants/actions'
const searchInitialState = {
    result: {
        albums: { items: [] },
        artists: { items: [] },
        tracks: { items: [] },
        playlists: { items: [] },
    }
}
const search = (state = searchInitialState, action) => {
    switch (action.type) {
        case constants.SEARCH:
            return {
                ...state,
                param: action.payload
            }
        case constants.SEARCH_VALUE:
            return {
                ...state,
                result: action.payload
            }
        case constants.SEARCH_ALBUMS:
            return {
                ...state
            }
        case constants.SEARCH_ARTISTS:
            return {
                ...state
            }
        case constants.SEARCH_PLAYLISTS:
            return {
                ...state
            }
        case constants.SEARCH_TRACKS:
            return {
                ...state
            }
        case constants.SEARCH_ALBUMS_RESULT:
            return {
                ...state,
                result: {...state.result, albums:action.payload}
            }
        case constants.SEARCH_ARTISTS_RESULT:
            return {
                ...state,
                result: {...state.result, artists:action.payload}
            }
        case constants.SEARCH_TRACKS_RESULT:
            return {
                ...state,
                result: {...state.result, tracks:action.payload}
            }
        case constants.SEARCH_PLAYLISTS_RESULT:
            return {
                ...state,
                result: {...state.result, playlists:action.payload}
            }
        default:
            return state
    }
}
export default search;