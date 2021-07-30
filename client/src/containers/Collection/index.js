import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import CollectionCard from '../../components/CollectionCard';
import CardItem from '../../components/CardItem';
import './styles.css';
import { getUserPlaylist, GetSavedTracks, getArtistFollowed, GetSavedALbums, GetSavedShows, GetSavedEpisodes } from '../../redux/actions/info';
import { NavLink } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CollectionMenu from '../../components/CollectionMenu';
Collection.propTypes = {
    id: PropTypes.string,
    getUserPlaylistsAction: PropTypes.func,
    getFollowedArtistsAction: PropTypes.func,
    getSavedEpisodesAction: PropTypes.func,
    playlist: PropTypes.array,
    savedTracks: PropTypes.object
};
Collection.defaultProps = {
    id: '',
    playlist: [],
    savedTracks: { items: [] },
    followedArtists: { items: [] },
    savedAlbums: { items: [] },
    savedShows: { items: [] },
    savedEpisodes: { items: [] },
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
        savedShows,
        getSavedEpisodesAction,
        savedEpisodes } = props;
    const { items } = savedTracks;
    let pathname = location.pathname.split('/');
    let match = pathname[pathname.length - 1];
    let type = match.split('').slice(0, match.length - 1).join('');
    const getData = (match) => {
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
                getSavedEpisodesAction();
                break;
            default:
                break;
        }
    }
    const test=useCallback(()=>{
        getData(match);
    },[match])
    useEffect(() => {
        getUserPlaylistsAction(id);
        test();
    }, [test,match,id,getUserPlaylistsAction])
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
                data.map((item,i)=>{
                    if(item && item.album){
                        data[i]=item.album;
                    }
                    return true;
                })
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
                    image={newItem.images && newItem.images[0] ? newItem.images[0].url : ''}
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
    const renderCollectionCard = () => {
        let xhtml = null;
        let data = null;
        data = match === 'playlists' ? items : savedEpisodes.items;
        xhtml = <CollectionCard data={data} type={match} />
        return xhtml;
    }
    return (
        <div className="collection">
            <CollectionMenu />
            <div className="collection-box">
                <h2>{type}</h2>
                <div className="collection-item">
                    {(match === 'playlists' && items.length >= 0) || (match === 'podcasts' && savedEpisodes.items.length >= 0) ?
                        renderCollectionCard()
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
        savedShows: state.show.savedShows,
        savedEpisodes: state.show.savedEpisodes,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getUserPlaylistsAction: bindActionCreators(getUserPlaylist, dispatch),
        getSavedTracksAction: bindActionCreators(GetSavedTracks, dispatch),
        getFollowedArtistsAction: bindActionCreators(getArtistFollowed, dispatch),
        getSavedAlbumsAction: bindActionCreators(GetSavedALbums, dispatch),
        getSavedShowsAction: bindActionCreators(GetSavedShows, dispatch),
        getSavedEpisodesAction: bindActionCreators(GetSavedEpisodes, dispatch),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Collection);