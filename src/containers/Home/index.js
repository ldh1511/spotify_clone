import React, { useEffect } from 'react';
import './styles.css';
import CurrentList from '../../components/CurrentList';
import CardBlock from '../../components/CardBlock';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getArtistFollowed, getContentHome, getPreviewUrl, getRecentPlaylist, getTracksPlaylist } from '../../redux/actions/info';
import PropTypes from 'prop-types';
Home.propTypes = {
    recentlyPlaylist: PropTypes.array,
    relatedArtists: PropTypes.array,
    categories: PropTypes.array,
    categoriesPlaylists: PropTypes.array,
    getContentHomeAction: PropTypes.func,
    getRecentPlaylistAcion: PropTypes.func,
}
Home.defaultProps = {
    recentlyPlaylist: [],
    relatedArtists: [],
    categories: [],
    categoriesPlaylists: [],
}
function Home(props) {
    const {
        info,
        getRecentPlaylistAcion,
        getContentHomeAction,
        recentlyPlaylist,
        categories,
        categoriesPlaylists,
        getArtistFollowedAction,
        getTracksInPlaylistAction,
        tracks, getPreviewUrlAction
    } = props;
    useEffect(() => {
        getRecentPlaylistAcion();
        getContentHomeAction();
        getArtistFollowedAction();
    }, [getRecentPlaylistAcion, getContentHomeAction, getArtistFollowedAction])
    const renderCategoriesPlaylists = () => {
        let categoriesPlaylistsLimit = categoriesPlaylists.map(item => (
            item = item.playlists.items.filter((e, i) => i < 5)
        ))
        let xhtml = null;
        xhtml = categories.map((item, i) => (
            <CardBlock
                key={item.id}
                data={categoriesPlaylistsLimit[i]}
                name={item.name}
                id={item.id}
                type='playlist'
                getTracksInPlaylist={getTracksInPlaylistAction}
                tracks={tracks}
                getPreviewUrl={getPreviewUrlAction}
            />
        ))
        return xhtml
    }
    const getTime = () => {
        let today = new Date();
        let time = today.getHours();
        let text = null;
        if (time < 12) {
            text = 'Good morning'
        }
        else if (time >= 12 && time <= 18) {
            text = 'Good afternoon'
        }
        else {
            text = 'Good evening'
        }
        return text
    }
    return (
        <div className="home">
            <div className="home-banner">
                <h1>{getTime()}, {info.display_name}</h1>
                <CurrentList
                    data={recentlyPlaylist}
                    getPreviewUrl={getPreviewUrlAction}
                    getTracksInPlaylist={getTracksInPlaylistAction}
                    tracks={tracks}
                />
            </div>
            {renderCategoriesPlaylists()}
        </div>
    );
}
const mapDispatchToProps = dispatch => {
    return {
        getRecentPlaylistAcion: bindActionCreators(getRecentPlaylist, dispatch),
        getContentHomeAction: bindActionCreators(getContentHome, dispatch),
        getArtistFollowedAction: bindActionCreators(getArtistFollowed, dispatch),
        getTracksInPlaylistAction: bindActionCreators(getTracksPlaylist, dispatch),
        getPreviewUrlAction: bindActionCreators(getPreviewUrl, dispatch)
    }
}
const mapStateToProps = state => {
    return {
        info: state.info,
        recentlyPlaylist: state.recentPlaylist,
        relatedArtists: state.contentHome.relatedArtists,
        categories: state.contentHome.categories,
        categoriesPlaylists: state.contentHome.categoriesPlaylists,
        tracks: state.tracks
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);