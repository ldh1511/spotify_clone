import { call, put, delay, takeLatest, takeEvery, all } from 'redux-saga/effects';
import * as constants from './../constants/actions';
import SpotifyWebApi from 'spotify-web-api-js';
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
} from '../redux/actions/info';
import { hideContentLoading, hideLoading, showContentLoading, showLoading } from '../redux/actions/ui';
const spotify = new SpotifyWebApi();
function* watchFetchUserInfo() {
    yield put(showLoading());
    try {
        const res = yield call(spotify.getMe);
        yield put(getUserInfoSuccess(res));
    }
    catch {
        yield put(getUserInfoFailed('error'))
    }
    yield put(hideLoading());
}
function* watchFetchUserPlaylist({ payload }) {
    try {
        const res = yield call(spotify.getUserPlaylists, payload);
        yield put(getUserPlaylistSuccess(res));

    }
    catch {
        yield put(getUserPlaylistFailed('error'))
    }
}
function* watchFetchRecentPlaylist() {
    try {
        const res = yield call(spotify.getMyRecentlyPlayedTracks);
        let idPlaylist = []
        res.items.map((item) => {
            let id = item.context.uri;
            id = id.split(':')[2]
            idPlaylist.push(id)
        })
        idPlaylist = Array.from(new Set(idPlaylist));
        const resp = yield all(idPlaylist.map(item => call(spotify.getPlaylist, item)));
        yield put(getRecentPlaylistSuccess(resp));
    }
    catch {
        yield put(getRecentPlaylistFailed('error'))
    }
}
function* watchFetchContentHome() {
    yield put(showContentLoading());
    const resp = yield call(spotify.getMyTopArtists);
    let [relatedArtists, categories] = yield all([
        yield all(resp.items.map(item => call(spotify.getArtistRelatedArtists, item.id))),
        call(spotify.getCategories, { country: 'VN' }),
    ])
    const randCatArr = [];
    for (let i = 0; i < 3; i++) {
        // lấy ngãu nhiên category
        const randCat = Math.floor(Math.random() * (categories.categories.items.length - 1));
        randCatArr.push(randCat);
    }
    categories = categories.categories.items.filter((item, i) => randCatArr.includes(i) === true);
    const tracks = yield all(categories.map(item => call(spotify.getCategoryPlaylists, item.id)));
    const data = [relatedArtists, categories, tracks];
    yield put(getContentHomeSuccess(data));
    yield put(hideContentLoading());
}
function* watchFetchArtistFollowed(){
    const res = yield call(spotify.getFollowedArtists,{limit:50});
    yield put(getArtistFollowedSuccess(res.artists));
}
function* watchFetchTracksInPlaylist({ payload }) {
    yield put(showContentLoading());
    const data = yield call(spotify.getPlaylist, payload);
    const res = yield call(spotify.getPlaylistTracks, payload);
    const dataArr = [data, res.items];
    yield put(getTracksPlaylistSuccess(dataArr));
    yield put(hideContentLoading());
}
function* watchFetchCategory({ payload }) {
    yield put(showContentLoading());
    const info = yield call(spotify.getCategory, payload, { country: 'VN' });
    const res = yield call(spotify.getCategoryPlaylists, payload, { country: 'VN' });
    yield put(getCategorySuccess([info, res]));
    yield put(hideContentLoading());
}
function* watchFetchCategories() {
    yield put(showContentLoading());
    const res = yield call(spotify.getCategories, { country: 'VN' });
    yield put(getCategoriesSuccess(res.categories.items))
    yield put(hideContentLoading());
}
function* Search({ payload }) {
    try {
        const res = yield call(spotify.search, payload, ["album", "track", "artist", "playlist"], { limit: 50 });
        yield put(SearchValue(res));
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
    const res = yield call(spotify.search, p, ["album"], { limit: 50, offset: cur });
    yield put(SearchAlbumsResult(res.albums));
}
function* SearchArtists({ payload }) {
    const { p, cur } = payload;
    const res = yield call(spotify.search, p, ["artist"], { limit: 50, offset: cur });
    yield put(SearchArtistsResult(res.artists));
}
function* SearchPlaylists({ payload }) {
    const { p, cur } = payload;
    const res = yield call(spotify.search, p, ["playlist"], { limit: 50, offset: cur });
    yield put(SearchPlaylistsResult(res.playlists));
}
function* SearchTracks({ payload }) {
    const { p, cur } = payload;
    const res = yield call(spotify.search, p, ["track"], { limit: 50, offset: cur });
    yield put(SearchTracksResult(res.tracks));
}
function* watchFetchArtist({ payload }) {
    yield put(showContentLoading());
    const res = yield call(spotify.getArtist, payload, { limit: 50 });
    const track = yield call(spotify.getArtistTopTracks, payload, 'VN');
    const albums = yield call(spotify.getArtistAlbums, payload, { limit: 50 });
    const related = yield call(spotify.getArtistRelatedArtists, payload, { limit: 50 });
    yield put(getArtistSuccess([res, track, albums, related]));
    yield put(hideContentLoading());
}
function* watchFetchAlbumTrack({ payload }) {
    try {
        const res = yield all(payload.map(id => call(spotify.getAlbumTracks, id)))
        yield put(getAlbumTracksSuccess(res));
    }
    catch {
        yield put(getAlbumFailed('error'));
    }
}
function* watchFetchAlbum({ payload }) {
    const res = yield call(spotify.getAlbum, payload);
    yield put(getAlbumSuccess(res));
}
function* watchFetchArtistAlbum({ payload }) {

    const res = yield call(spotify.getArtistAlbums, payload, {limit:50});
    yield put(getArtistAlbumSuccess(res));

}
function* watchFollowArtist({payload}){
    try{
        yield call(spotify.followArtists,[payload]);
        yield put(FollowArtistSuccess(payload));
    }
    catch{
        yield put(FollowArtistFailed(payload));
    }
}
function* watchUnFollowArtist({payload}){
    try{
        yield call(spotify.unfollowArtists,[payload]);
        yield put(UnFollowArtistSuccess(payload));
    }
    catch{
        yield put(UnFollowArtistFailed(payload));
    }
}
function* watchFetchSavedTracks(){
    try{
        const res=yield call(spotify.getMySavedTracks);
        yield put(GetSavedTracksSuccess(res))
    }
    catch{
        yield put(GetSavedTracksFailed('error'))
    }
}
function* watchFetchSavedAlbums(){
    try{
        const res=yield call(spotify.getMySavedAlbums);
        yield put(GetSavedALbumsSuccess(res))
    }
    catch{
        yield put(GetSavedALbumsFailed('error'))
    }
}
function* watchFetchSavedShows(){
    try{
        const res=yield call(spotify.getMySavedShows);
        yield put(GetSavedShowsSuccess(res));
    }
    catch{
        yield put(GetSavedShowsFailed('error'))
    }
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
}
export default rootSaga;