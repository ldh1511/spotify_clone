import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './styles.css';
import { SearchAlbums, SearchArtists, SearchPlaylists, SearchTracks } from '../../redux/actions/info';
import TrackTable from '../../components/TrackTable';
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
    let typeSearch = pathname[pathname.length - 1];
    const getData = () => {
        const { playlists, artists, albums, tracks } = search;
        let data = null;
        let total = null;
        let type = null;
        switch (typeSearch) {
            case "albums":
                data = albums.items;
                total = albums.total;
                type = "album";
                break;
            case "artists":
                data = artists.items;
                total = artists.total;
                type = "artist";
                break;
            case "playlists":
                data = playlists.items;
                total = playlists.total;
                type = "playlist";
                break;
            case "tracks":
                data = tracks.items;
                total = tracks.total;
                type = "track";
                break;
            default:
                break;
        }
        return {
            data: data,
            total: total,
            type: type
        };
    }
    const handleClick = (cur, total, type) => {
        if (cur < total) {
            switch (type) {
                case "track":
                    SearchTracksAction(param, cur);
                    break;
                case "album":
                    SearchAlbumsAction(param, cur);
                    break;
                case "artist":
                    SearchArtistsAction(param, cur);
                    break;
                case "playlist":
                    SearchPlaylistsAction(param, cur);
                    break;
                default:
                    break;
            }

        }
    }
    const renderCardList = () => {
        let xhtml = null;
        let result = getData();
        const { data, total, type } = result;
        if (typeSearch !== 'tracks') {
            xhtml = (
                <>
                    <CardList data={data} type={typeSearch.substring(0, typeSearch.length - 1)} />
                    <p
                        onClick={() => handleClick(data.length, total, type)}
                        className="see-more--btn">
                        Xem thêm
                    </p>
                </>
            )
        }
        else {
            xhtml = (
                <>
                    <TrackTable data={data} name="tracks" param={param} type='track' />
                    <p
                        onClick={() => handleClick(data.length, total, type)}
                        className="see-more--btn">
                        Xem thêm
                    </p>
                </>
            )
        }
        return xhtml;
    }
    return (
        <div className="search-result">
            <h3> All {typeSearch} for "{param}"</h3>
            {renderCardList()}
        </div>
    );
}
const mapStateToProps = (state) => {
    return {
        search: state.search.result
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        SearchAlbumsAction: bindActionCreators(SearchAlbums, dispatch),
        SearchArtistsAction: bindActionCreators(SearchArtists, dispatch),
        SearchPlaylistsAction: bindActionCreators(SearchPlaylists, dispatch),
        SearchTracksAction: bindActionCreators(SearchTracks, dispatch),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);