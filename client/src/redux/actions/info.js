import * as constants from '../../constants/actions'
export const getUserInfo=()=>{
    return{
        type:constants.GET_USER_INFO
    }
}
export const getUserInfoSuccess=(data)=>{
    return{
        type:constants.GET_USER_INFO_SUCCESS,
        payload:data
    }
}
export const getUserInfoFailed=(data)=>{
    return{
        type:constants.GET_USER_INFO_FAILED,
        payload:data
    }
}
export const setToken=(token)=>{
    return{
        type:constants.SET_USER_TOKEN,
        payload:token
    }
}

export const getUserPlaylist=(id)=>{
    return{
        type:constants.GET_USER_PLAYLISTS,
        payload:id
    }
}
export const getUserPlaylistSuccess=(data)=>{
    return{
        type:constants.GET_USER_PLAYLISTS_SUCCESS,
        payload:data
    }
}
export const getUserPlaylistFailed=(data)=>{
    return{
        type:constants.GET_USER_PLAYLISTS_FAILED,
        payload:data
    }
}
export const getRecentPlaylist=()=>{
    return{
        type:constants.GET_RECENT_PLAYLISTS,
    }
}
export const getRecentPlaylistSuccess=(data)=>{
    return{
        type:constants.GET_RECENT_PLAYLISTS_SUCCESS,
        payload:data
    }
}
export const getRecentPlaylistFailed=(data)=>{
    return{
        type:constants.GET_RECENT_PLAYLISTS_FAILED,
        payload:data
    }
}

export const getContentHome=()=>{
    return{
        type:constants.GET_CONTENT_HOME,
    }
}
export const getContentHomeSuccess=(data)=>{
    return{
        type:constants.GET_CONTENT_HOME_SUCCESS,
        payload:data
    }
}
export const getContentHomeFailed=(data)=>{
    return{
        type:constants.GET_CONTENT_HOME_FAILED,
        payload:data
    }
}

export const getTracksPlaylist=(id)=>{
    return{
        type:constants.GET_TRACKS_PLAYLIST,
        payload:id
    }
}

export const getCategorySuccess=(data)=>{
    return{
        type:constants.GET_CATEGORY_SUCCESS,
        payload:data
    }
}
export const getCategoryFailed=(data)=>{
    return{
        type:constants.GET_CATEGORY_FAILED,
        payload:data
    }
}
export const getCategory=(id)=>{
    return{
        type:constants.GET_CATEGORY,
        payload:id
    }
}
export const getTracksPlaylistSuccess=(data)=>{
    return{
        type:constants.GET_TRACKS_PLAYLIST_SUCCESS,
        payload:data
    }
}
export const getTracksPlaylistFailed=(data)=>{
    return{
        type:constants.GET_TRACKS_PLAYLIST_FAILED,
        payload:data
    }
}
