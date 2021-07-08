import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCategories, GetSavedTracks } from '../../redux/actions/info';
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
        albums: {
            items: []
        },
        artists: {
            items: []
        },
        playlists: {
            items: []
        },
        tracks: {
            items: []
        }
    },
    param: ''
}
function Search(props) {
    const { getCategoriesAction, categories, search, param, savedTracks, getSavedTracksAction } = props;
    useEffect(() => {
        getCategoriesAction();
        getSavedTracksAction();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const renderSearchPlaylists = () => {
        const { playlists } = search;
        let xhtml = null;
        let data = playlists.items.slice(0,5);
        if (playlists.items.length > 0) {
            xhtml = <CardBlock data={data} name="playlists" param={param} type='playlist' />
        }
        return xhtml;
    }
    const renderSearchTracks = () => {
        const { tracks } = search;
        let xhtml = null;
        let data = tracks.items.slice(0,5);
        if (tracks.items.length > 0) {
            xhtml = <CardBlock data={data} name="tracks" param={param} type='track' savedTracks={savedTracks}/>
        }
        return xhtml;
    }
    const renderSearchAlbums = () => {
        const { albums } = search;
        let xhtml = null;
        let data = albums.items.slice(0,5);
        if (albums.items.length > 0) {
            xhtml = <CardBlock data={data} name="albums" param={param} type='album' />
        }
        return xhtml;
    }
    const renderSearchArtists = () => {
        const { artists } = search;
        let xhtml = null;
        let data = artists.items.slice(0,5);
        if (artists.items.length > 0) {
            xhtml = <CardBlock data={data} name="artists" param={param} type='artist' />
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
            <SearchBar type="default-search"/>
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
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        getCategoriesAction: bindActionCreators(getCategories, dispatch),
        getSavedTracksAction: bindActionCreators(GetSavedTracks, dispatch),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Search);