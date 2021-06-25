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
            let newAlbums=state.result.albums.items.concat(action.payload.items)
            return {
                ...state,
                result: {
                    ...state.result, 
                    albums:{
                        ...state.result.albums, 
                        items:newAlbums
                    }
                }
            }
        case constants.SEARCH_ARTISTS_RESULT:
            let newArtists=state.result.artists.items.concat(action.payload.items)
            return {
                ...state,
                result: {
                    ...state.result, 
                    artists:{
                        ...state.result.artists, 
                        items:newArtists
                    }
                }
            }
        case constants.SEARCH_TRACKS_RESULT:
            let newItems=state.result.tracks.items.concat(action.payload.items)
            return {
                ...state,
                result: {
                    ...state.result, 
                    tracks:{
                        ...state.result.tracks, 
                        items:newItems
                    }
                }
            }
        case constants.SEARCH_PLAYLISTS_RESULT:
            let newPlaylists=state.result.playlists.items.concat(action.payload.items)
            return {
                ...state,
                result: {
                    ...state.result, 
                    playlists:{
                        ...state.result.playlists, 
                        items:newPlaylists
                    }
                }
            }
        default:
            return state
    }
}
export default search;