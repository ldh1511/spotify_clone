import { API_ENDPOINT } from "./../constants/api";
import axiosServices from "./axiosServices";

export const setAccessToken = () => {
    return
}
export const getMe = () => {
    let token = localStorage.getItem('token');
    return axiosServices.get(`${API_ENDPOINT}/v1/me`, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    });
}
export const getToken = (param) => {
    return axiosServices.post(`https://accounts.spotify.com/api/token`, null, {
        params: {
            code: `${param}`,
            redirect_uri: 'http://localhost:3000/',
            grant_type: 'authorization_code',
            client_secret: '6ebf9056a7e742b1af35e6f90beb1b75',
            client_id: '9a1e71af41074900af7ee6ede5ba105b',
        }
    });
}
export const getRecentlyPlaylistTrack = () => {
    let token = localStorage.getItem('token');
    return axiosServices.get(`${API_ENDPOINT}/v1/me/player/recently-played`, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    });
}

export const getPlaylist = (id) => {
    let token = localStorage.getItem('token');
    return axiosServices.get(`${API_ENDPOINT}/v1/playlists/${id}`, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    });
}
export const getUserPlaylists = (id = '') => {
    let token = localStorage.getItem('token');
    return axiosServices.get(`${API_ENDPOINT}/v1/users/${id}/playlists`, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    });
}

export const getMyTop = (type) => {
    let token = localStorage.getItem('token');
    return axiosServices.get(`${API_ENDPOINT}/v1/me/top/${type}`, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    });
}


export const getArtistRelatedArtists = (id) => {
    let token = localStorage.getItem('token');
    return axiosServices.get(`${API_ENDPOINT}/v1/artists/${id}/related-artists`, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    });
}

export const getCategoryPlaylists = (id, param) => {
    let params = param
    let token = localStorage.getItem('token');
    return axiosServices.get(`${API_ENDPOINT}/v1/browse/categories/${id}/playlists`, {
        headers: {
            Authorization: 'Bearer ' + token
        },
        params
    });
}
export const getCategories = (param) => {
    let token = localStorage.getItem('token');
    let params = param
    return axiosServices.get(`${API_ENDPOINT}/v1/browse/categories`, {
        headers: {
            Authorization: 'Bearer ' + token
        },
        params
    });
}
export const getFollowedArtists = (param) => {
    let token = localStorage.getItem('token');
    let params = { type: "artist" };
    params = { ...params, ...param };
    return axiosServices.get(`${API_ENDPOINT}/v1/me/following`, {
        headers: {
            Authorization: 'Bearer ' + token
        },
        params
    });
}
export const getPlaylistTracks = (id) => {
    let token = localStorage.getItem('token');
    return axiosServices.get(`${API_ENDPOINT}/v1/playlists/${id}/tracks`, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    });
}
export const getCategory = (id, param) => {
    let token = localStorage.getItem('token');
    let params = param
    return axiosServices.get(`${API_ENDPOINT}/v1/browse/categories/${id}`, {
        headers: {
            Authorization: 'Bearer ' + token
        },
        params
    });
}

export const search = (query, type, param) => {
    let params = { q: query, type: type.join(',') }
    params = { ...params, ...param };
    let token = localStorage.getItem('token');
    return axiosServices.get(`${API_ENDPOINT}/v1/search`, {
        headers: {
            Authorization: 'Bearer ' + token
        },
        params
    });
}
export const getArtist = (id, param) => {
    let params = param;
    let token = localStorage.getItem('token');
    return axiosServices.get(`${API_ENDPOINT}/v1/artists/${id}`, {
        headers: {
            Authorization: 'Bearer ' + token
        },
        params
    });
}
export const getArtistTopTracks = (id, param) => {
    let params = param;
    let token = localStorage.getItem('token');
    return axiosServices.get(`${API_ENDPOINT}/v1/artists/${id}/top-tracks`, {
        headers: {
            Authorization: 'Bearer ' + token
        },
        params
    });
}
export const getArtistAlbums = (id, param = {}) => {
    let params = param;
    let token = localStorage.getItem('token');
    return axiosServices.get(`${API_ENDPOINT}/v1/artists/${id}/albums`, {
        headers: {
            Authorization: 'Bearer ' + token
        },
        params
    });
}
export const getAlbumTracks = (id, param = {}) => {
    let params = param;
    let token = localStorage.getItem('token');
    return axiosServices.get(`${API_ENDPOINT}/v1/albums/${id}/tracks`, {
        headers: {
            Authorization: 'Bearer ' + token
        },
        params
    });
}
export const getAlbum = (id, param = {}) => {
    let params = param;
    let token = localStorage.getItem('token');
    return axiosServices.get(`${API_ENDPOINT}/v1/albums/${id}`, {
        headers: {
            Authorization: 'Bearer ' + token
        },
        params
    });
}

export const followArtists = (id) => {
    let token = localStorage.getItem('token');
    return axiosServices.put(`${API_ENDPOINT}/v1/me/following`, {
        ids: id
    }, {
        headers: {
            Authorization: 'Bearer ' + token
        },
        params: {
            type: 'artist',
            ids: id.join(',')
        },
    }
    );
}
export const unfollowArtists = (id) => {
    let token = localStorage.getItem('token');
    return axiosServices.delete(`${API_ENDPOINT}/v1/me/following`, {
        headers: {
            Authorization: 'Bearer ' + token
        },
        params: {
            type: 'artist',
            ids: id.join(',')
        },
        data: {
            ids: id
        }

    });
}
export const getMySavedTracks = (param = {}) => {
    let params = param;
    let token = localStorage.getItem('token');
    return axiosServices.get(`${API_ENDPOINT}/v1/me/tracks`, {
        headers: {
            Authorization: 'Bearer ' + token
        },
        params
    });
}
export const getMySavedAlbums = (param = {}) => {
    let params = param;
    let token = localStorage.getItem('token');
    return axiosServices.get(`${API_ENDPOINT}/v1/me/albums`, {
        headers: {
            Authorization: 'Bearer ' + token
        },
        params
    });
}
export const getMySavedShows = (param = {}) => {
    let params = param;
    let token = localStorage.getItem('token');
    return axiosServices.get(`${API_ENDPOINT}/v1/me/shows`, {
        headers: {
            Authorization: 'Bearer ' + token
        },
        params
    });
}
export const getMySavedEpisodes = (param = {}) => {
    let params = param;
    let token = localStorage.getItem('token');
    return axiosServices.get(`${API_ENDPOINT}/v1/me/episodes`, {
        headers: {
            Authorization: 'Bearer ' + token
        },
        params
    });
}

export const uploadPlaylistImage = (id, param = {}) => {
    let data = param;
    let token = localStorage.getItem('token');
    return axiosServices.put(`${API_ENDPOINT}/v1/playlists/${id}/images`, data, {
        headers: {
            Authorization: 'Bearer ' + token,
            "content-type": 'image/jpeg'
        }
    });
}

export const updatePlaylistDetail = (id, param = {}) => {
    let data = param;
    let token = localStorage.getItem('token');
    return axiosServices.put(`${API_ENDPOINT}/v1/playlists/${id}`, data, {
        headers: {
            Authorization: 'Bearer ' + token,
            "content-type": 'application/json'
        }
    });
}

export const addItemToPlaylist = (id, uris) => {
    let token = localStorage.getItem('token');
    return axiosServices.post(`${API_ENDPOINT}/v1/playlists/${id}/tracks`, null, {
        headers: {
            Authorization: 'Bearer ' + token,
            "content-type": 'application/json'
        },
        params: {
            uris
        }
    });
}

export const removeItemFromPlaylist = (id, data) => {
    let tracks = { "tracks": data }
    let token = localStorage.getItem('token');

    return axiosServices.delete(`${API_ENDPOINT}/v1/playlists/${id}/tracks`, {
        headers: {
            Authorization: 'Bearer ' + token,
            "content-type": 'application/json'
        },
        data: tracks

    });
}

export const saveTracks = (ids) => {
    let token = localStorage.getItem('token');
    return axiosServices.put(`${API_ENDPOINT}/v1/me/tracks`, null, {
        headers: {
            Authorization: 'Bearer ' + token,
            "content-type": 'application/json'
        },
        params: {
            ids
        }
    });
}
export const removeFromTracks = (ids) => {
    let token = localStorage.getItem('token');
    return axiosServices.delete(`${API_ENDPOINT}/v1/me/tracks`, {
        headers: {
            Authorization: 'Bearer ' + token,
            "content-type": 'application/json'
        },
        params: {
            ids
        }
    });
}

export const getShow = (id) => {
    let token = localStorage.getItem('token');
    return axiosServices.get(`${API_ENDPOINT}/v1/shows/${id}`, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    });
}

export const saveAlbums = (ids) => {
    let token = localStorage.getItem('token');
    return axiosServices.put(`${API_ENDPOINT}/v1/me/albums`, null, {
        headers: {
            Authorization: 'Bearer ' + token,
            "content-type": 'application/json'
        },
        params: {
            ids
        }
    });
}
export const removeAlbums = (ids) => {
    let token = localStorage.getItem('token');
    return axiosServices.delete(`${API_ENDPOINT}/v1/me/albums`, {
        headers: {
            Authorization: 'Bearer ' + token,
            "content-type": 'application/json'
        },
        params: {
            ids
        }
    });
}
export const createPlaylist = (id, num) => {
    let token = localStorage.getItem('token');
    return axiosServices.post(`${API_ENDPOINT}/v1/users/${id}/playlists`, {
        name: `Playlist của tôi #${num} `
    }, {
        headers: {
            Authorization: 'Bearer ' + token,
            "content-type": 'application/json'
        },
    });
}