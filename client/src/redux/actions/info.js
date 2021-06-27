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
export const getCategoriesSuccess=(data)=>{
    return{
        type:constants.GET_CATEGORIES_SUCCESS,
        payload:data
    }
}
export const getCategoriesFailed=(data)=>{
    return{
        type:constants.GET_CATEGORIES_FAILED,
        payload:data
    }
}
export const getCategories=()=>{
    return{
        type:constants.GET_CATEGORIES
    }
}

export const SearchValue=(data)=>{
    return{
        type:constants.SEARCH_VALUE,
        payload:data
    }
}
export const Search=(param)=>{
    return{
        type:constants.SEARCH,
        payload:param
    }
}

export const SearchAlbumsResult=(data)=>{
    return{
        type:constants.SEARCH_ALBUMS_RESULT,
        payload:data
    }
}
export const SearchAlbums=(param, cur)=>{
    return{
        type:constants.SEARCH_ALBUMS,
        payload:{
            p:param,
            cur:cur
        }
    }
}

export const SearchArtistsResult=(data)=>{
    return{
        type:constants.SEARCH_ARTISTS_RESULT,
        payload:data
    }
}
export const SearchArtists=(param,cur)=>{
    return{
        type:constants.SEARCH_ARTISTS,
        payload:{
            p:param,
            cur:cur
        }
    }
}

export const SearchPlaylistsResult=(data)=>{
    return{
        type:constants.SEARCH_PLAYLISTS_RESULT,
        payload:data
    }
}
export const SearchPlaylists=(param, cur)=>{
    return{
        type:constants.SEARCH_PLAYLISTS,
        payload:{
            p:param,
            cur:cur
        }
    }
}

export const SearchTracksResult=(data)=>{
    return{
        type:constants.SEARCH_TRACKS_RESULT,
        payload:data
    }
}
export const SearchTracks=(param,cur)=>{
    return{
        type:constants.SEARCH_TRACKS,
        payload:{
            p:param,
            cur:cur
        }
    }
}

export const getArtistSuccess=(data)=>{
    return{
        type:constants.GET_ARTIST_SUCCESS,
        payload:data
    }
}
export const getArtistFailed=(data)=>{
    return{
        type:constants.GET_ARTIST_FAILED,
        payload:data
    }
}
export const getArtist=(id)=>{
    return{
        type:constants.GET_ARTIST,
        payload:id
    }
}
export const getArtistTopTrackSuccess=(data)=>{
    return{
        type:constants.GET_ARTIST_SUCCESS,
        payload:data
    }
}
export const getArtistTopTrackFailed=(data)=>{
    return{
        type:constants.GET_ARTIST_FAILED,
        payload:data
    }
}
export const getArtistTopTrack=(idArtist, idCountry)=>{
    return{
        type:constants.GET_ARTIST,
        payload:{
            idArtist:idArtist,
            idCountry:idCountry
        }
    }
}

export const getAlbumTracksSuccess=(data)=>{
    return{
        type:constants.GET_ALBUM_TRACK_SUCCESS,
        payload:data
    }
}
export const getAlbumTracksFailed=(data)=>{
    return{
        type:constants.GET_ALBUM_TRACK_FAILED,
        payload:data
    }
}
export const getAlbumTracks=(param)=>{
    return{
        type:constants.GET_ALBUM_TRACK,
        payload:param
    }
}

export const getAlbumSuccess=(data)=>{
    return{
        type:constants.GET_ALBUM_SUCCESS,
        payload:data
    }
}
export const getAlbumFailed=(data)=>{
    return{
        type:constants.GET_ALBUM_FAILED,
        payload:data
    }
}
export const getAlbum=(param)=>{
    return{
        type:constants.GET_ALBUM,
        payload:param
    }
}

export const getArtistAlbumSuccess=(data)=>{
    return{
        type:constants.GET_ARTIST_ALBUM_SUCCESS,
        payload:data
    }
}
export const getArtistAlbumFailed=(data)=>{
    return{
        type:constants.GET_ARTIST_ALBUM_FAILED,
        payload:data
    }
}
export const getArtistAlbum=(param)=>{
    return{
        type:constants.GET_ARTIST_ALBUM,
        payload:param
    }
}