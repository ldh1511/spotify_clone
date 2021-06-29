import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import CollectionCard from '../../components/CollectionCard';
import CardItem from '../../components/CardItem';
import './styles.css';
import { getUserPlaylist, GetSavedTracks, getArtistFollowed, GetSavedALbums, GetSavedShows } from '../../redux/actions/info';
import { NavLink } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CollectionMenu from '../../components/CollectionMenu';
Collection.propTypes = {
    id: PropTypes.string,
    getUserPlaylistsAction: PropTypes.func,
    getFollowedArtistsAction: PropTypes.func,
    playlist: PropTypes.array,
    savedTracks: PropTypes.object
};
Collection.defaultProps = {
    id: '',
    playlist: [],
    savedTracks: { items: [] },
    followedArtists: { items: [] },
    savedAlbums: { items: [] },
    savedShows: { items: [] }
}
function Collection(props) {
    const {
        id,
        getUserPlaylistsAction,
        playlist,
        getSavedTracksAction,
        savedTracks,
        location,
        getFollowedArtistsAction,
        followedArtists,
        getSavedAlbumsAction,
        savedAlbums,
        getSavedShowsAction,
        savedShows } = props;
    const { items } = savedTracks;
    let pathname = location.pathname.split('/');
    let match = pathname[pathname.length - 1];
    let type = match.split('').slice(0, match.length - 1).join('');
    useEffect(() => {
        getUserPlaylistsAction(id);
        switch (match) {
            case 'playlists':
                getSavedTracksAction();
                break;
            case 'artists':
                getFollowedArtistsAction();
                break;
            case 'albums':
                getSavedAlbumsAction();
                break;
            case 'podcasts':
                getSavedShowsAction();
                break;
            default:
                break;
        }

    }, [match])
    const renderCardList = () => {
        let xhtml = null, data = null;
        switch (match) {
            case 'playlists':
                data = playlist
                break;
            case 'artists':
                data = followedArtists.items
                break;
            case 'albums':
                data = savedAlbums.items
                break;
            case 'podcasts':
                data = savedShows.items
                break;
            default:
                break;
        }
        if (data.length !== 0) {
            xhtml = data.map(item => {
                let newItem = item.show ? item.show : item;
                return (< CardItem
                    key={newItem.id}
                    name={newItem.name}
                    image={newItem.images[0] ? newItem.images[0].url : ''}
                    description={newItem.description}
                    id={newItem.id}
                    type={type}
                />)
            })
        }
        else {
            xhtml = (<div className="collection-noti">
                <i className="fas fa-compact-disc"></i>
                <h3>Theo dõi {type} đầu tiên của bạn</h3>
                <p>Lưu {type} bằng cách nhấn vào biểu tượng trái tim</p>
                <NavLink to='/search'>Tìm {type}</NavLink>
            </div>)
        }
        return xhtml;
    }
    return (
        <div className="collection">
            <CollectionMenu />
            <div className="collection-box">
                <h2>{type}</h2>
                <div className="collection-item">
                    {match === 'playlists' || match === 'podcasts' ?
                        <CollectionCard data={items} />
                        : <></>
                    }
                    {renderCardList()}
                </div>
            </div>
        </div>
    );
}
const mapStateToProps = (state, ownProps) => {
    return {
        id: state.info.id,
        playlist: state.playlist.items,
        savedTracks: state.tracks.savedTracks,
        followedArtists: state.artist.followedArtists,
        savedAlbums: state.album.savedAlbums,
        savedShows: state.show.savedShows
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getUserPlaylistsAction: bindActionCreators(getUserPlaylist, dispatch),
        getSavedTracksAction: bindActionCreators(GetSavedTracks, dispatch),
        getFollowedArtistsAction: bindActionCreators(getArtistFollowed, dispatch),
        getSavedAlbumsAction: bindActionCreators(GetSavedALbums, dispatch),
        getSavedShowsAction: bindActionCreators(GetSavedShows, dispatch),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Collection);