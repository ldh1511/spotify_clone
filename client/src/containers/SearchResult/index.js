import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './styles.css';
import { SearchAlbums, SearchArtists, SearchPlaylists, SearchTracks } from '../../redux/actions/info';
import PlaylistTable from '../../components/PlaylistTable';
import CardList from '../../components/CardList';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
SearchResult.propTypes = {
    SearchAlbumsAction: PropTypes.func,
    SearchArtistsAction: PropTypes.func,
    SearchTracksAction: PropTypes.func,
    SearchPlaylistsAction: PropTypes.func,
    search: PropTypes.object
};

function SearchResult(props) {
    const {
        location,
        SearchAlbumsAction,
        SearchArtistsAction,
        SearchTracksAction,
        SearchPlaylistsAction,
        search
    } = props;
    let pathname = location.pathname.split('/');
    let param = pathname[pathname.length - 2];
    let type = pathname[pathname.length - 1];
    const getData = () => {
        const { playlists, artists, albums, tracks } = search;
        let data = null;
        switch (type) {
            case "albums":
                data = albums.items;
                break;
            case "artists":
                data = artists.items;
                break;
            case "playlists":
                data = playlists.items;
                break;
            case "tracks":
                data = tracks.items;
                break;
            default:
                break;
        }
        return data;
    }
    const renderCardList = () => {
        let xhtml = null;
        let data = getData();
        if (type !== 'tracks') {
            xhtml = <CardList data={data} type={type.substring(0, type.length - 1)} />
        }
        else{
            xhtml=<PlaylistTable data={data} name="tracks" param={param} type='track'/>
        }
        return xhtml;
    }
    return (
        <div className="search-result">
            <h3> All {type} for "{param}"</h3>
            {renderCardList()}
        </div>
    );
}
const mapStateToProps = (state, ownProps) => {
    return {
        search: state.search.result
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        SearchAlbumsAction: bindActionCreators(SearchAlbums, dispatch),
        SearchArtistsAction: bindActionCreators(SearchArtists, dispatch),
        SearchPlaylistsAction: bindActionCreators(SearchPlaylists, dispatch),
        SearchTracksAction: bindActionCreators(SearchTracks, dispatch),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);