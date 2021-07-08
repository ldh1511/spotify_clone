import * as constants from '../../constants/actions'
export const showLoading=()=>{
    return{
        type:constants.SHOW_LOADING
    }
}
export const hideLoading=()=>{
    return{
        type:constants.HIDE_LOADING
    }
}
export const showContentLoading=()=>{
    return{
        type:constants.SHOW_CONTENT_LOADING
    }
}
export const hideContentLoading=()=>{
    return{
        type:constants.HIDE_CONTENT_LOADING
    }
}
export const openTrackMenu=(id,name_artist, id_artist, idTracks, data)=>{
    return{
        type:constants.OPEN_TRACK_MENU,
        payload:{
            id:id,
            artists:name_artist,
            idArtists:id_artist,
            idTracks:idTracks,
            dataTracks:data
        }
    }
}
export const closeTrackMenu=()=>{
    return{
        type:constants.CLOSE_TRACK_MENU
    }
}
export const login=(token)=>{
    return{
        type:constants.LOGIN,
        payload:token
    }
}
export const logout=()=>{
    return{
        type:constants.LOGOUT
    }
}