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
    getCategorySuccess
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
        call(spotify.getCategories),
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
function* watchFetchTracksInPlaylist({payload}){
    yield put(showContentLoading());
    const data=yield call(spotify.getPlaylist,payload);
    const res=yield call(spotify.getPlaylistTracks,payload);
    const dataArr=[data,res.items];
    yield put(getTracksPlaylistSuccess(dataArr));
    yield put(hideContentLoading());
}
function* watchFetchCategory({payload}){
    yield put(showContentLoading());
    const info=yield call(spotify.getCategory,payload);
    const res=yield call(spotify.getCategoryPlaylists,payload);
    yield put(getCategorySuccess([info, res]));
    yield put(hideContentLoading());
}
function* rootSaga() {
    yield takeLatest(constants.GET_USER_INFO, watchFetchUserInfo);
    yield takeLatest(constants.GET_RECENT_PLAYLISTS, watchFetchRecentPlaylist);
    yield takeEvery(constants.GET_USER_PLAYLISTS, watchFetchUserPlaylist);
    yield takeEvery(constants.GET_CONTENT_HOME, watchFetchContentHome);
    yield takeEvery(constants.GET_TRACKS_PLAYLIST, watchFetchTracksInPlaylist);
    yield takeEvery(constants.GET_CATEGORY, watchFetchCategory);
}
export default rootSaga;