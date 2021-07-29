import { combineReducers } from 'redux';
import album from './album';
import artist from './artist';
import categories from './categories';
import contentHome from './contentHome';
import images from './images';
import info from './info';
import login from './login';
import music from './music';
import notification from './notification';
import recentPlaylist from './recentPlaylist';
import search from './search';
import show from './show';
import tracks from './tracks';
import ui from './ui';
import userPlaylists from './userplaylists';

const rootReducer = combineReducers({
    login:login,
    ui:ui,
    info:info,
    playlist:userPlaylists,
    recentPlaylist:recentPlaylist,
    contentHome:contentHome,
    tracks:tracks,
    categories:categories,
    search:search,
    artist:artist,
    album:album,
    show:show,
    images:images,
    music:music,
    notification:notification
});
export default rootReducer;