import * as constants from '../../constants/actions'
const albumInitialState = {}
const album = (state = albumInitialState, action) => {
    switch (action.type) {
        case constants.GET_ALBUM:
            return state
        case constants.GET_ALBUM_SUCCESS:
            return {
                ...state,
                albumInfo: action.payload
            }
        case constants.GET_ALBUM_FAILED:
            return state
        case constants.GET_ARTIST_ALBUM:
            return state
        case constants.GET_ARTIST_ALBUM_SUCCESS:
            return {
                ...state,
                relatedAlbum: action.payload
            }
        case constants.GET_ARTIST_ALBUM_FAILED:
            return state
        case constants.GET_SAVED_ALBUMS:
            return state
        case constants.GET_SAVED_ALBUMS_SUCCESS:
            return {
                ...state,
                savedAlbums: action.payload
            }
        case constants.GET_SAVED_ALBUMS_FAILED:
            return state
        case constants.SAVE_ALBUMS:
            return state
        case constants.SAVE_ALBUMS_SUCCESS:
            return {
                ...state,
                savedAlbums:{
                    ...state.savedAlbums,
                    items:[...state.savedAlbums.items,action.payload]
                }
            }
        case constants.SAVE_ALBUMS_FAILED:
            return state
        case constants.REMOVE_ALBUMS:
            return state
        case constants.REMOVE_ALBUMS_SUCCESS:
            let newItems=state.savedAlbums.items.filter(item=>item.album.id!==action.payload)
            return {
                ...state,
                savedAlbums:{...state.savedAlbums,items:newItems}
            }
        case constants.REMOVE_ALBUMS_FAILED:
            return state
        default:
            return state
    }
}
export default album;