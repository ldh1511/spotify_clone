import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Banner from '../../components/Banner';
import TrackTable from '../../components/TrackTable';
import Modal from '../../components/Modal';
import { CloseModal, getTracksPlaylist, getUserInfo, OpenModal, uploadPlaylistImage } from '../../redux/actions/info';
import './styles.css';
import PropTypes from 'prop-types';

Playlist.propTypes = {
    tracksInPlaylist: PropTypes.array,
    getTracksInPlaylist: PropTypes.func,
    OpenModalAction: PropTypes.func,
    CloseModalAction: PropTypes.func,
    getUserInfoAction: PropTypes.func,
    UploadPlaylistImgAction: PropTypes.func,
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
    const { getTracksInPlaylist, location, tracksInPlaylist, playlistInfo, getUserInfoAction, id, OpenModalAction, CloseModalAction, stateModal, UploadPlaylistImgAction } = props;
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
            />
            <div className="playlist-detail">
                <div className="playlist-btn">
                    <button className="play-btn btn-active"><i className="fas fa-play"></i></button>
                </div>
                <TrackTable data={tracksInPlaylist} />
            </div>
            <Modal
                check={stateModal}
                closeModal={CloseModalAction}
                upload={UploadPlaylistImgAction}
                id={match}
            />
        </div>
    );
}
const mapStateToProps = state => {
    return {
        tracksInPlaylist: state.tracks.tracksInPlaylist,
        playlistInfo: state.tracks.playlistInfo,
        id: state.info.id,
        stateModal: state.ui.openModal
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getTracksInPlaylist: bindActionCreators(getTracksPlaylist, dispatch),
        getUserInfoAction: bindActionCreators(getUserInfo, dispatch),
        OpenModalAction: bindActionCreators(OpenModal, dispatch),
        CloseModalAction: bindActionCreators(CloseModal, dispatch),
        UploadPlaylistImgAction: bindActionCreators(uploadPlaylistImage, dispatch),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Playlist);