import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useHistory } from "react-router-dom";
import queryString from 'query-string';
import { getAlbum, getCategories, getPreviewUrl, GetSavedTracks, getTracksPlaylist, RemoveFromTracks, SaveTracks, Search } from '../../redux/actions/info';
import './styles.css';
import CategoriesList from '../../components/CategoriesList';
import SearchBar from '../../components/SearchBar';
import CardBlock from '../../components/CardBlock';
Search.propTypes = {
    categories: PropTypes.array,
    getCategoriesAction: PropTypes.func,
    search: PropTypes.object,
    param: PropTypes.string
};
Search.defaultProps = {
    categories: [],
    search: {
        albums: { items: [] },
        artists: { items: [] },
        playlists: { items: [] },
        tracks: { items: [] }
    },
    param: '',
    albumInfo: {
        images: [{ url: '' }],
        tracks: {
            items: []
        },
        release_date: '',
        artists: [{ name: '', id: '' }],
        id: ''
    },
}
function SearchPage(props) {
    const { getCategoriesAction,
        categories, search,location,
        param, savedTracks,tracks,
        getSavedTracksAction, SaveTracksAction,
        removeFromTracksAction, searchAction,
        getTracksInPlaylistAction,getPreviewUrlAction,
        getAlbumAction, albumInfo
    } = props;
    let history = useHistory();
    useEffect(() => {
        getCategoriesAction();
        getSavedTracksAction();
    }, [getCategoriesAction, getSavedTracksAction])
    useEffect(()=>{
        const parsed = queryString.parse(location.search);
        if(parsed.q){
            searchAction(parsed.q);
        }
        else{
            searchAction('');
        }
    },[location,tracks,searchAction])
    const renderSearchPlaylists = () => {
        const { playlists } = search;
        let xhtml = null;
        let data = playlists.items.slice(0, 5);
        if (playlists.items.length > 0) {
            xhtml = (<CardBlock 
                data={data} 
                name="playlists" 
                param={param} 
                type='playlist'
                getTracksInPlaylist={getTracksInPlaylistAction}
                tracks={tracks}
                getPreviewUrl={getPreviewUrlAction} 
            />)
        }
        return xhtml;
    }
    const renderSearchTracks = () => {
        const { tracks } = search;
        let xhtml = null;
        let data = tracks.items.slice(0, 5);
        if (tracks.items.length > 0) {
            xhtml = <CardBlock data={data} name="tracks"
                param={param} type='track'
                savedTracks={savedTracks}
                SaveTracksAction={SaveTracksAction}
                removeFromTrack={removeFromTracksAction}
            />
        }
        return xhtml;
    }
    const renderSearchAlbums = () => {
        const { albums } = search;
        let xhtml = null;
        let data = albums.items.slice(0, 5);
        if (albums.items.length > 0) {
            xhtml = (<CardBlock 
                data={data} name="albums" 
                param={param} type='album'
                albumInfo={albumInfo}
                getPreviewUrl={getPreviewUrlAction} 
                getAlbum={getAlbumAction}
            />)
        }
        return xhtml;
    }
    const renderSearchArtists = () => {
        const { artists } = search;
        let xhtml = null;
        let data = artists.items.slice(0, 5);
        if (artists.items.length > 0) {
            xhtml = <CardBlock data={data} name="artists" param={param} type='artist' />
        }
        return xhtml;
    }
    const renderSearchShows = () => {
        const { shows } = search;
        let xhtml = null;
        let data = shows.items.slice(0, 5);
        if (shows.items.length > 0) {
            xhtml = <CardBlock data={data} name="podcasts" param={param} type='podcast' />
        }
        return xhtml;
    }
    const renderSearchResult = () => {
        let xhtml = null;
        if (renderSearchPlaylists() && renderSearchAlbums()) {
            xhtml = (
                <>
                    {renderSearchTracks()}
                    {renderSearchArtists()}
                    {renderSearchPlaylists()}
                    {renderSearchAlbums()}
                    {renderSearchShows()}
                </>
            )
        }
        else {
            xhtml = <CategoriesList data={categories} />
        }
        return xhtml;
    }
    return (
        <div className="search-container">
            <SearchBar type="default-search" history={history}/>
            {renderSearchResult()}
        </div>
    );
}
const mapStateToProps = (state) => {
    return {
        categories: state.categories.categories,
        search: state.search.result,
        param: state.search.param,
        savedTracks: state.tracks.savedTracks,
        tracks:state.tracks,
        albumInfo: state.album.albumInfo,
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        getCategoriesAction: bindActionCreators(getCategories, dispatch),
        getSavedTracksAction: bindActionCreators(GetSavedTracks, dispatch),
        SaveTracksAction: bindActionCreators(SaveTracks, dispatch),
        removeFromTracksAction: bindActionCreators(RemoveFromTracks, dispatch),
        searchAction: bindActionCreators(Search, dispatch),
        getTracksInPlaylistAction: bindActionCreators(getTracksPlaylist, dispatch),
        getPreviewUrlAction: bindActionCreators(getPreviewUrl, dispatch),
        getAlbumAction: bindActionCreators(getAlbum, dispatch),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);