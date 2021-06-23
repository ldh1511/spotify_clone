import { combineReducers } from 'redux';
import artist from './artist';
import categories from './categories';
import contentHome from './contentHome';
import info from './info';
import recentPlaylist from './recentPlaylist';
import search from './search';
import tracks from './tracks';
import ui from './ui';
import userPlaylists from './userplaylists';

const rootReducer = combineReducers({
    ui:ui,
    info:info,
    playlist:userPlaylists,
    recentPlaylist:recentPlaylist,
    contentHome:contentHome,
    tracks:tracks,
    categories:categories,
    search:search,
    artist:artist,
});
export default rootReducer;