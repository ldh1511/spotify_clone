import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Banner from '../../components/Banner';
import TrackTable from '../../components/TrackTable';
import CollectionSearch from '../CollectionSearch';
import Modal from '../../components/Modal';
import { CloseModal, getCurrentImg, getTracksPlaylist, getUserInfo, OpenModal, updatePlaylistDetail, uploadPlaylistImage } from '../../redux/actions/info';
import './styles.css';
import PropTypes from 'prop-types';

Playlist.propTypes = {
    tracksInPlaylist: PropTypes.array,
    getTracksInPlaylist: PropTypes.func,
    OpenModalAction: PropTypes.func,
    CloseModalAction: PropTypes.func,
    getUserInfoAction: PropTypes.func,
    getCurrentImgAction: PropTypes.func,
    UploadPlaylistImgAction: PropTypes.func,
    updatePlaylistDetailAction: PropTypes.func,
    playlistInfo: PropTypes.object,
    location: PropTypes.string
};
Playlist.defaultProps = {
    tracksInPlaylist: [],
    playlistInfo: {
        images: [{ url: '' }],
        owner: {
            display_name: '',
            id: ''
        }
    },
    id: ''
}
function Playlist(props) {
    const { getTracksInPlaylist, location, tracksInPlaylist, playlistInfo, getUserInfoAction, id, OpenModalAction, CloseModalAction, stateModal, UploadPlaylistImgAction, getCurrentImgAction, currentImg, updatePlaylistDetailAction } = props;

    let pathname = location.pathname.split('/');
    let match = pathname[pathname.length - 1];
    useEffect(() => {
        getTracksInPlaylist(match);
        getUserInfoAction()
    }, [])
    return (
        <div className="playlist">
            <Banner
                name={playlistInfo.name}
                image={playlistInfo.images[0] ? playlistInfo.images[0].url : ''}
                description={playlistInfo.description}
                owner={playlistInfo.owner.display_name}
                type={playlistInfo.type}
                custom={id === playlistInfo.owner.id ? true : false}
                openModal={OpenModalAction}
                getCurImg={getCurrentImgAction}
                currentImg={currentImg}
            />
            <div className="playlist-detail">
                {tracksInPlaylist.length > 0 ?
                    <>
                        <div className="playlist-btn">
                            <button className="play-btn btn-active"><i className="fas fa-play"></i></button>
                        </div>
                        <TrackTable data={tracksInPlaylist} />
                    </> :
                    <CollectionSearch />
                }
            </div>
            <Modal
                check={stateModal}
                closeModal={CloseModalAction}
                upload={UploadPlaylistImgAction}
                id={match}
                currentImg={currentImg}
                getCurImg={getCurrentImgAction}
                name={playlistInfo.name}
                description={playlistInfo.description}
                update={updatePlaylistDetailAction}
            />
        </div>
    );
}
const mapStateToProps = state => {
    return {
        tracksInPlaylist: state.tracks.tracksInPlaylist,
        playlistInfo: state.tracks.playlistInfo,
        id: state.info.id,
        stateModal: state.ui.openModal,
        currentImg: state.images.currentImg
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getTracksInPlaylist: bindActionCreators(getTracksPlaylist, dispatch),
        getUserInfoAction: bindActionCreators(getUserInfo, dispatch),
        OpenModalAction: bindActionCreators(OpenModal, dispatch),
        CloseModalAction: bindActionCreators(CloseModal, dispatch),
        UploadPlaylistImgAction: bindActionCreators(uploadPlaylistImage, dispatch),
        getCurrentImgAction: bindActionCreators(getCurrentImg, dispatch),
        updatePlaylistDetailAction: bindActionCreators(updatePlaylistDetail, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Playlist);