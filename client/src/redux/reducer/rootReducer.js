import { combineReducers } from 'redux';
import categories from './categories';
import contentHome from './contentHome';
import info from './info';
import recentPlaylist from './recentPlaylist';
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
    categories:categories
});
export default rootReducer;