import * as constants from '../../constants/actions'
const uiInitialState = {
    showLoading: false,
    showContentLoading: false,
    openModal:false,
    openTrackMenu:false,
    albumId:null,
    artists:null,
    predominantColor:'#121212',
    test:null
}
const ui = (state = uiInitialState, action) => {
    switch (action.type) {
        case constants.SHOW_LOADING:
            return {
                ...state,
                showLoading:true
            }
        case constants.HIDE_LOADING:
            return {
                ...state,
                showLoading:false
            }
        case constants.SHOW_CONTENT_LOADING:
            return{
                ...state,
                showContentLoading:true
            }
        case constants.HIDE_CONTENT_LOADING:
            return{
                ...state,
                showContentLoading:false
            }
        case constants.OPEN_MODAL:
            return{
                ...state,
                openModal:true
            }
        case constants.CLOSE_MODAL:
            return{
                ...state,
                openModal:false
            }
        case constants.OPEN_TRACK_MENU:
            return {
                ...state,
                openTrackMenu:true,
                albumId:action.payload.id,
                artists:action.payload.artists.split(", ").slice(0,action.payload.artists.split(", ").length-1),
                idArtists:action.payload.idArtists.split(", ").slice(0,action.payload.idArtists.split(", ").length-1),
                idTracks:action.payload.idTracks,
                dataTracks:action.payload.dataTracks
            }
        case constants.CLOSE_TRACK_MENU:
            return{
                ...state,
                openTrackMenu:false
            }
        case constants.GET_PREDOMINANT_COLOR:
            return{
                ...state,
                predominantColor:action.payload
            }
        default:
            return state
    }
}
export default ui;