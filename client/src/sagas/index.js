import { call, put, takeLatest, takeEvery, all, delay } from 'redux-saga/effects';
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
    updatePlaylistDetailSuccess,
    updatePlaylistDetailFailed,
    addItemToPlaylistSuccess,
    addItemToPlaylistFailed,
    SaveTracksSuccess,
    SaveTracksFailed,
    RemoveFromTracksSuccess,
    RemoveFromTracksFailed,
    removeItemFromPlaylistFailed,
    removeItemFromPlaylistSuccess,
    getShowSuccess,
    getShowFailed,
    addNotification,
    hideNotification,
    saveAlbumsSuccess,
    saveAlbumsFailed,
    getContentHomeFailed,
    getTracksPlaylistFailed,
    getCategoryFailed,
    getCategoriesFailed,
    removeAlbumsSuccess,
    removeAlbumsFailed,
    getUserPlaylist,
    createPlaylistSuccess,
    createPlaylistFailed,
    uploadPlaylistImage_Success,
    uploadPlaylistImage_Failed
} from '../redux/actions/info';
import { hideContentLoading, hideLoading, showContentLoading, showLoading } from '../redux/actions/ui';
function* watchFetchUserInfo() {
    try {
        yield put(showLoading());
        const res = yield call(api.getMe);
        yield put(getUserInfoSuccess(res.data));
        yield put(hideLoading());
    }
    catch (error) {
        yield put(getUserInfoFailed(error.response.status))
    }
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
        let idPlaylist = [];
        let datas = res.data.items;
        datas.map((item) => {
            if (item.context !== null) {
                let id = item.context.uri;
                id = id.split(':')[2];
                idPlaylist.push(id);
            }
            return true;
        })
        idPlaylist = Array.from(new Set(idPlaylist));
        const resp = yield all(idPlaylist.map(item => call(api.getPlaylist, item)));
        let newData = [];
        resp.map(item => {
            newData.push(item.data);
            return true;
        })
        yield put(getRecentPlaylistSuccess(newData));
    }
    catch (error) {
        yield put(getRecentPlaylistFailed(error))
    }
}
function* watchFetchContentHome() {
    try {
        yield put(showContentLoading());
        const resp = yield call(api.getMyTop, 'artists');
        let [relatedArtists, categories] = yield all([
            yield all(resp.data.items.map(item => call(api.getArtistRelatedArtists, item.id))),
            call(api.getCategories, { country: 'VN' }),
        ])
        const randCatArr = [];
        for (let i = 0; i < 9; i++) {
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
        const data = [relatedArtists, categories, newTracks];
        yield put(getContentHomeSuccess(data));
        yield put(hideContentLoading());
    }
    catch (error) {
        yield put(getContentHomeFailed(error));
    }
}
function* watchFetchArtistFollowed() {
    const res = yield call(api.getFollowedArtists, { limit: 50 });
    yield put(getArtistFollowedSuccess(res.data.artists));
}
function* watchFetchTracksInPlaylist({ payload }) {
    try {
        yield put(showContentLoading());
        const data = yield call(api.getPlaylist, payload);
        const res = yield call(api.getPlaylistTracks, payload);
        const dataArr = [data.data, res.data.items];
        yield put(getTracksPlaylistSuccess(dataArr));
        yield put(hideContentLoading());
    }
    catch (error) {
        yield put(getTracksPlaylistFailed(error));
    }
}
function* watchFetchCategory({ payload }) {
    try {
        yield put(showContentLoading());
        const info = yield call(api.getCategory, payload, { country: 'VN' });
        const res = yield call(api.getCategoryPlaylists, payload, { country: 'VN' });
        yield put(getCategorySuccess([info.data, res.data]));
        yield put(hideContentLoading());
    }
    catch (error) {
        yield put(getCategoryFailed(error));
    }
}
function* watchFetchCategories() {
    try {
        yield put(showContentLoading());
        const res = yield call(api.getCategories, { country: 'VN' });
        yield put(getCategoriesSuccess(res.data.categories.items));
        yield put(hideContentLoading());
    }
    catch (error) {
        yield put(getCategoriesFailed(error));
    }
}
function* Search({ payload }) {
    if (payload !== '') {
        try {
            const res = yield call(api.search, payload, ["album", "track", "artist", "playlist", "show", "episode"], { limit: 50, market: 'VN' });
            yield put(SearchValue(res.data));
        }
        catch {
            yield put(SearchValue({
                albums: { items: [] },
                artists: { items: [] },
                tracks: { items: [] },
                playlists: { items: [] },
                shows: { items: [] },
                episodes: { items: [] }
            }));
        }
    }
    else {
        yield put(SearchValue({
            albums: { items: [] },
            artists: { items: [] },
            tracks: { items: [] },
            playlists: { items: [] },
            shows: { items: [] },
            episodes: { items: [] }
        }));
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
        let res;
        if (typeof payload === 'object') {
            res = yield all(payload.map(id => call(api.getAlbumTracks, id)))
            yield put(getAlbumTracksSuccess(res));
        }
        else {
            res = yield call(api.getAlbumTracks, payload);
            yield put(getAlbumTracksSuccess(res.data));
        }

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
        yield put(addNotification('Followed !'));
        yield delay(2000);
        yield put(hideNotification());
    }
    catch {
        yield put(FollowArtistFailed(payload));
    }
}
function* watchUnFollowArtist({ payload }) {
    try {
        yield call(api.unfollowArtists, [payload]);
        yield put(UnFollowArtistSuccess(payload));
        yield put(addNotification('Unfollowed !'));
        yield delay(2000);
        yield put(hideNotification());
    }
    catch {
        yield put(UnFollowArtistFailed(payload));
    }
}
function* watchFetchSavedTracks() {
    try {
        const res = yield call(api.getMySavedTracks, { limit: 50 });
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
        yield put(GetSavedEpisodesSuccess(res.data));
    }
    catch {
        yield put(GetSavedEpisodesFailed('error'))
    }
}
function* watchUploadImage({ payload }) {
    try{
        const img = yield call(constants.getBase64, payload.data);
        yield call(api.uploadPlaylistImage, payload.id, img.split(',')[1])
        yield put(uploadPlaylistImage_Success(payload.src));
        yield put(addNotification('Update Successfully !'));
        yield delay(2000);
        yield put(hideNotification());
    }
    catch{
        yield put(uploadPlaylistImage_Failed('error'))
    }
}
function* watchUpdatePlaylistDetail({ payload }) {
    try {
        yield call(api.updatePlaylistDetail, payload.id, payload.data);
        yield put(updatePlaylistDetailSuccess(payload.data));
        yield put(addNotification('Update Successfully !'));
        yield delay(2000);
        yield put(hideNotification());
    }
    catch {
        yield put(updatePlaylistDetailFailed('error'))
    }
}
function* watchAddItemToPlaylist({ payload }) {
    const { data } = payload;
    let uri = `${payload.uris}`;
    let item = null;
    if (data.track === undefined) {
        item = {
            added_at: constants.getFormattedDate(),
            data
        }
    }
    item = {
        added_at: constants.getFormattedDate(),
        track: data
    }
    try {
        yield call(api.addItemToPlaylist, payload.id, uri);
        yield put(addItemToPlaylistSuccess(item));
        yield put(addNotification('Added track to playlist !'));
        yield delay(2000);
        yield put(hideNotification());
    }
    catch {
        yield put(addItemToPlaylistFailed('error'))
    }
}
function* watchSaveTracks({ payload }) {
    let ids = `${payload.ids}`;
    if (payload.data.added_at === undefined) {
        payload.data = { ...payload.data, added_at: constants.getFormattedDate() }
    }
    try {
        yield call(api.saveTracks, ids);
        yield put(SaveTracksSuccess(payload.data));
        yield put(addNotification('Added to saved tracks !'));
        yield delay(2000);
        yield put(hideNotification());
    }
    catch {
        yield put(SaveTracksFailed('error'))
    }
}
function* watchRemoveFromTracks({ payload }) {
    try {
        yield call(api.removeFromTracks, payload);
        yield put(RemoveFromTracksSuccess(payload));
        yield put(addNotification('Removed from saved tracks !'));
        yield delay(2000);
        yield put(hideNotification());
    }
    catch {
        yield put(RemoveFromTracksFailed('error'))
    }
}
function* watchRemoveItemFromPlaylist({ payload }) {
    let data = [{ "uri": payload.uris.track.uri }]
    try {
        yield call(api.removeItemFromPlaylist, payload.id, data);
        yield put(removeItemFromPlaylistSuccess(payload))
        yield put(addNotification('Removed track to playlist !'));
        yield delay(2000);
        yield put(hideNotification());
    }
    catch {
        yield put(removeItemFromPlaylistFailed('error'))
    }
}
function* watchFetchShow({ payload }) {
    try {
        const res = yield call(api.getShow, payload);
        yield put(getShowSuccess(res.data));
    }
    catch {
        yield put(getShowFailed('error'))
    }
}
function* watchSaveAlbums({ payload }) {
    let data=payload.data
    if (payload.data.added_at === undefined) {
        data={
            added_at: constants.getFormattedDate(),
            album:payload.data
        }
    }
    try {
        yield call(api.saveAlbums, payload.id);
        yield put(saveAlbumsSuccess(data));
        yield put(addNotification('Added to library !'));
        yield delay(2000);
        yield put(hideNotification());
    }
    catch {
        yield put(saveAlbumsFailed('error'))
    }
}
function* watchRemoveAlbums({payload}){
    try {
        yield call(api.removeAlbums, payload);
        yield put(removeAlbumsSuccess(payload));
        yield put(addNotification('Removed from library !'));
        yield delay(2000);
        yield put(hideNotification());
    }
    catch {
        yield put(removeAlbumsFailed('error'))
    }
}
function* watchCreatePlaylist({payload}){
    try{
        yield call(api.createPlaylist,payload.id,payload.num);
        const res=yield call(api.getUserPlaylists,payload.id);
        yield put(createPlaylistSuccess(res.data));
        yield put(addNotification('Create Playlist Successfully !'));
        yield delay(2000);
        yield put(hideNotification());
    }
    catch{
        yield put (createPlaylistFailed('error'))
    }
    console.log(payload)
}
function* rootSaga() {
    yield takeEvery(constants.GET_USER_INFO, watchFetchUserInfo);
    yield takeEvery(constants.GET_RECENT_PLAYLISTS, watchFetchRecentPlaylist);
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
    yield takeEvery(constants.GET_A_SHOW, watchFetchShow);
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
    yield takeEvery(constants.UPDATE_PLAYLIST_DETAIL, watchUpdatePlaylistDetail);
    yield takeEvery(constants.ADD_ITEM_TO_PLAYLIST, watchAddItemToPlaylist);
    yield takeEvery(constants.SAVE_TRACKS, watchSaveTracks);
    yield takeEvery(constants.REMOVE_FROM_TRACKS, watchRemoveFromTracks);
    yield takeEvery(constants.REMOVE_ITEM_FROM_PLAYLIST, watchRemoveItemFromPlaylist);
    yield takeEvery(constants.SAVE_ALBUMS, watchSaveAlbums);
    yield takeEvery(constants.REMOVE_ALBUMS, watchRemoveAlbums);
    yield takeEvery(constants.CREATE_PLAYLIST, watchCreatePlaylist);
}
export default rootSaga;