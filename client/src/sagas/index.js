import { call, put, takeLatest, takeEvery, all } from 'redux-saga/effects';
import * as constants from './../constants/actions';
import * as api from '../apis/info';
import {
    getContentHomeSuccess,
    getRecentPlaylistFailed,
    getRecentPlaylistSuccess,
    getUserInfoFailed,
    getUserInfoSuccess,
    getUserPlaylistFailed,
    getUserPlaylistSuccess,
    getTracksPlaylistSuccess,
    getCategorySuccess,
    getCategoriesSuccess,
    SearchValue,
    getArtistSuccess,
    SearchTracksResult,
    SearchAlbumsResult,
    SearchArtistsResult,
    SearchPlaylistsResult,
    getAlbumTracksSuccess,
    getAlbumSuccess,
    getAlbumFailed,
    getArtistAlbumSuccess,
    getArtistFollowedSuccess,
    FollowArtistSuccess,
    FollowArtistFailed,
    UnFollowArtistSuccess,
    UnFollowArtistFailed,
    GetSavedTracksSuccess,
    GetSavedTracksFailed,
    GetSavedALbumsSuccess,
    GetSavedALbumsFailed,
    GetSavedShowsFailed,
    GetSavedShowsSuccess,
    GetSavedEpisodesSuccess,
    GetSavedEpisodesFailed,
} from '../redux/actions/info';
import { hideContentLoading, hideLoading, showContentLoading, showLoading } from '../redux/actions/ui';
function* watchFetchUserInfo() {
    yield put(showLoading());
    try {
        const res = yield call(api.getMe);
        console.log(res);
        yield put(getUserInfoSuccess(res.data));
    }
    catch {
        yield put(getUserInfoFailed('error'))
    }
    yield put(hideLoading());
}
function* watchFetchUserPlaylist({ payload }) {
    try {
        const res = yield call(api.getUserPlaylists, payload);
        yield put(getUserPlaylistSuccess(res.data));

    }
    catch {
        yield put(getUserPlaylistFailed('error'))
    }
}
function* watchFetchRecentPlaylist() {
    try {
        const res = yield call(api.getRecentlyPlaylistTrack);
        let idPlaylist = []
        res.data.items.map((item) => {
            let id = item.context.uri;
            id = id.split(':')[2]
            idPlaylist.push(id);
            return true;
        })
        idPlaylist = Array.from(new Set(idPlaylist));
        const resp = yield all(idPlaylist.map(item => call(api.getPlaylist, item)));
        yield put(getRecentPlaylistSuccess(resp.data));
    }
    catch {
        yield put(getRecentPlaylistFailed('error'))
    }
}
function* watchFetchContentHome() {
    yield put(showContentLoading());
    const resp = yield call(api.getMyTop, 'artists');
    let [relatedArtists, categories] = yield all([
        yield all(resp.data.items.map(item => call(api.getArtistRelatedArtists, item.id))),
        call(api.getCategories, { country: 'VN' }),
    ])
    const randCatArr = [];
    for (let i = 0; i < 3; i++) {
        // lấy ngãu nhiên category
        const randCat = Math.floor(Math.random() * (categories.data.categories.items.length - 1));
        randCatArr.push(randCat);
    }
    categories = categories.data.categories.items.filter((item, i) => randCatArr.includes(i) === true);
    const tracks = yield all(categories.map(item => call(api.getCategoryPlaylists, item.id)));
    let newTracks = [];
    let newRelatedArtists = [];
    tracks.map(item => {
        newTracks.push(item.data);
        return true;
    });
    relatedArtists.map(item => {
        newRelatedArtists.push(item.data);
        return true;
    });
    console.log(newTracks);
    const data = [relatedArtists, categories, newTracks];
    yield put(getContentHomeSuccess(data));
    yield put(hideContentLoading());
}
function* watchFetchArtistFollowed() {
    const res = yield call(api.getFollowedArtists, { limit: 50 });
    yield put(getArtistFollowedSuccess(res.data.artists));
}
function* watchFetchTracksInPlaylist({ payload }) {
    yield put(showContentLoading());
    const data = yield call(api.getPlaylist, payload);
    const res = yield call(api.getPlaylistTracks, payload);
    const dataArr = [data.data, res.data.items];
    yield put(getTracksPlaylistSuccess(dataArr));
    yield put(hideContentLoading());
}
function* watchFetchCategory({ payload }) {
    yield put(showContentLoading());
    const info = yield call(api.getCategory, payload, { country: 'VN' });
    const res = yield call(api.getCategoryPlaylists, payload, { country: 'VN' });
    yield put(getCategorySuccess([info.data, res.data]));
    yield put(hideContentLoading());
}
function* watchFetchCategories() {
    yield put(showContentLoading());
    const res = yield call(api.getCategories, { country: 'VN' });
    yield put(getCategoriesSuccess(res.data.categories.items))
    yield put(hideContentLoading());
}
function* Search({ payload }) {
    try {
        const res = yield call(api.search, payload, ["album", "track", "artist", "playlist"], { limit: 50 });
        yield put(SearchValue(res.data));
    }
    catch {
        const data = {
            albums: { items: [] },
            artists: { items: [] },
            tracks: { items: [] },
            playlists: { items: [] },
        }
        yield put(SearchValue(data));
    }
}
function* SearchAlbums({ payload }) {
    const { p, cur } = payload;
    const res = yield call(api.search, p, ["album"], { limit: 50, offset: cur });
    yield put(SearchAlbumsResult(res.data.albums));
}
function* SearchArtists({ payload }) {
    const { p, cur } = payload;
    const res = yield call(api.search, p, ["artist"], { limit: 50, offset: cur });
    yield put(SearchArtistsResult(res.data.artists));
}
function* SearchPlaylists({ payload }) {
    const { p, cur } = payload;
    const res = yield call(api.search, p, ["playlist"], { limit: 50, offset: cur });
    yield put(SearchPlaylistsResult(res.data.playlists));
}
function* SearchTracks({ payload }) {
    const { p, cur } = payload;
    const res = yield call(api.search, p, ["track"], { limit: 50, offset: cur });
    yield put(SearchTracksResult(res.data.tracks));
}
function* watchFetchArtist({ payload }) {
    yield put(showContentLoading());
    const res = yield call(api.getArtist, payload, { limit: 50 });
    const track = yield call(api.getArtistTopTracks, payload, { market: 'VN' });
    const albums = yield call(api.getArtistAlbums, payload, { limit: 50 });
    const related = yield call(api.getArtistRelatedArtists, payload, { limit: 50 });
    yield put(getArtistSuccess([res.data, track.data, albums.data, related.data]));
    yield put(hideContentLoading());
}
function* watchFetchAlbumTrack({ payload }) {
    try {
        const res = yield all(payload.map(id => call(api.getAlbumTracks, id)))
        yield put(getAlbumTracksSuccess(res.data));
    }
    catch {
        yield put(getAlbumFailed('error'));
    }
}
function* watchFetchAlbum({ payload }) {
    const res = yield call(api.getAlbum, payload);
    yield put(getAlbumSuccess(res.data));
}
function* watchFetchArtistAlbum({ payload }) {

    const res = yield call(api.getArtistAlbums, payload, { limit: 50 });
    yield put(getArtistAlbumSuccess(res.data));

}
function* watchFollowArtist({ payload }) {
    try {
        yield call(api.followArtists, [payload]);
        yield put(FollowArtistSuccess(payload));
    }
    catch {
        yield put(FollowArtistFailed(payload));
    }
}
function* watchUnFollowArtist({ payload }) {
    try {
        yield call(api.unfollowArtists, [payload]);
        yield put(UnFollowArtistSuccess(payload));
    }
    catch {
        yield put(UnFollowArtistFailed(payload));
    }
}
function* watchFetchSavedTracks() {
    try {
        const res = yield call(api.getMySavedTracks);
        yield put(GetSavedTracksSuccess(res.data))
    }
    catch {
        yield put(GetSavedTracksFailed('error'))
    }
}
function* watchFetchSavedAlbums() {
    try {
        const res = yield call(api.getMySavedAlbums);
        yield put(GetSavedALbumsSuccess(res.data))
    }
    catch {
        yield put(GetSavedALbumsFailed('error'))
    }
}
function* watchFetchSavedShows() {
    try {
        const res = yield call(api.getMySavedShows);
        yield put(GetSavedShowsSuccess(res.data));
    }
    catch {
        yield put(GetSavedShowsFailed('error'))
    }
}
function* watchFetchSavedEpisodes() {
    try {
        const res = yield call(api.getMySavedEpisodes);
        console.log(res.data);
        yield put(GetSavedEpisodesSuccess(res.data));
    }
    catch {
        yield put(GetSavedEpisodesFailed('error'))
    }
}
function* watchUploadImage({ payload }) {
    const img=yield call(constants.getBase64,payload.data);
    // const fd=new FormData();
    // fd.append('image',payload.data);
    const res=yield call(api.uploadPlaylistImage,payload.id,img)
}
function* rootSaga() {
    yield takeLatest(constants.GET_USER_INFO, watchFetchUserInfo);
    yield takeLatest(constants.GET_RECENT_PLAYLISTS, watchFetchRecentPlaylist);
    yield takeEvery(constants.GET_USER_PLAYLISTS, watchFetchUserPlaylist);
    yield takeEvery(constants.GET_CONTENT_HOME, watchFetchContentHome);
    yield takeEvery(constants.GET_ARTIST_FOLLOWED, watchFetchArtistFollowed);
    yield takeEvery(constants.GET_TRACKS_PLAYLIST, watchFetchTracksInPlaylist);
    yield takeEvery(constants.GET_CATEGORY, watchFetchCategory);
    yield takeEvery(constants.GET_CATEGORIES, watchFetchCategories);
    yield takeLatest(constants.SEARCH, Search);
    yield takeLatest(constants.SEARCH_ALBUMS, SearchAlbums);
    yield takeLatest(constants.SEARCH_ARTISTS, SearchArtists);
    yield takeLatest(constants.SEARCH_PLAYLISTS, SearchPlaylists);
    yield takeLatest(constants.SEARCH_TRACKS, SearchTracks);
    yield takeLatest(constants.GET_ARTIST, watchFetchArtist);
    yield takeLatest(constants.GET_ALBUM_TRACK, watchFetchAlbumTrack);
    yield takeLatest(constants.GET_ALBUM, watchFetchAlbum);
    yield takeEvery(constants.GET_ARTIST_ALBUM, watchFetchArtistAlbum);
    yield takeEvery(constants.FOLLOW_ARTIST, watchFollowArtist);
    yield takeEvery(constants.UNFOLLOW_ARTIST, watchUnFollowArtist);
    yield takeEvery(constants.GET_SAVED_TRACKS, watchFetchSavedTracks);
    yield takeEvery(constants.GET_SAVED_ALBUMS, watchFetchSavedAlbums);
    yield takeEvery(constants.GET_SAVED_SHOWS, watchFetchSavedShows);
    yield takeEvery(constants.GET_SAVED_EPISODES, watchFetchSavedEpisodes);
    yield takeEvery(constants.UPLOAD_PLAYLIST_IMAGE, watchUploadImage);
}
export default rootSaga;