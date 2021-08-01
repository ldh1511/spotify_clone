import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Banner from '../../components/Banner';
import TrackTable from '../../components/TrackTable';
import TrackMenu from '../../components/TrackMenu';
import CollectionSearch from '../CollectionSearch';
import Modal from '../../components/Modal';
import { CloseModal, getCurrentImg, GetSavedTracks, getTracksPlaylist, getUserInfo, OpenModal, RemoveFromTracks, SaveTracks, updatePlaylistDetail, uploadPlaylistImage, getPredominantColor, Search, getPreviewUrl } from '../../redux/actions/info';
import { closeTrackMenu, openTrackMenu } from '../../redux/actions/ui';
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
    location: PropTypes.object
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
    id: '',
    savedTracks: { items: [] },
    info: {
        display_name: ''
    }
}
function Playlist(props) {
    const { getTracksInPlaylist,
        location, tracksInPlaylist,
        playlistInfo, getUserInfoAction,
        id, OpenModalAction,
        CloseModalAction, stateModal,
        UploadPlaylistImgAction, getCurrentImgAction,
        currentImg, updatePlaylistDetailAction,
        openTrackMenuAction, getSavedTracksAction, savedTracks, SaveTracksAction,
        removeFromTracksAction, info,
        getPredominantColorAction, predominantColor,
        getPreviewUrlAction, searchAction } = props;
    let pathname = location.pathname.split('/');
    let match = pathname[pathname.length - 1];
    useEffect(() => {
        if (match !== 'tracks') {
            getTracksInPlaylist(match);
        }
        getUserInfoAction();
        getSavedTracksAction();
        searchAction('');
    }, [match, getTracksInPlaylist, getUserInfoAction, getSavedTracksAction]);
    const getImage = () => {
        if (match === 'tracks') {
            return ''
        }
        else {
            if (playlistInfo.images && playlistInfo.images[0]) {
                return playlistInfo.images[0].url
            }
            else {
                return ''
            }
        }
    }
    const handlePlayAudio=()=>{
        let type=pathname[pathname.length - 2];
        if(type==='playlist'){
            getPreviewUrlAction(tracksInPlaylist[0],tracksInPlaylist);
        }
    }
    return (
        <div className="playlist">
            <Banner
                name={match !== 'tracks' ? playlistInfo.name : 'Bài hát đã thích'}
                image={getImage()}
                description={match !== 'tracks' ? playlistInfo.description : ''}
                owner={match !== 'tracks' ? playlistInfo.owner.display_name : info.display_name}
                type={match !== 'tracks' ? playlistInfo.type : 'playlist'}
                custom={id === playlistInfo.owner.id ? true : false}
                openModal={OpenModalAction}
                getCurImg={getCurrentImgAction}
                currentImg={currentImg}
                getPredominantColor={getPredominantColorAction}
                predominantColor={predominantColor}
            />
            <div className="mid-content" style={{ backgroundColor: `${predominantColor}` }}>
                <button className="play-btn" onClick={()=>handlePlayAudio()}>
                    <i className="fas fa-play"></i>
                </button>
            </div>
            <div className="playlist-detail">
                <TrackTable
                    data={match !== 'tracks' ? tracksInPlaylist : savedTracks.items}
                    openTrackMenu={openTrackMenuAction} savedTracks={savedTracks}
                    SaveTracksAction={SaveTracksAction}
                    removeFromTrack={removeFromTracksAction}
                    getPreviewUrl={getPreviewUrlAction}
                />
                {id === playlistInfo.owner.id ? <CollectionSearch idPlaylist={match} /> : <></>}
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
            <TrackMenu />

        </div>
    );
}
const mapStateToProps = state => {
    return {
        tracksInPlaylist: state.tracks.tracksInPlaylist,
        playlistInfo: state.tracks.playlistInfo,
        id: state.info.id,
        stateModal: state.ui.openModal,
        stateTrackMenu: state.ui.openTrackMenu,
        currentImg: state.images.currentImg,
        savedTracks: state.tracks.savedTracks,
        info: state.info,
        predominantColor: state.ui.predominantColor,
        param: state.search.param
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
        updatePlaylistDetailAction: bindActionCreators(updatePlaylistDetail, dispatch),
        openTrackMenuAction: bindActionCreators(openTrackMenu, dispatch),
        closeTrackMenuAction: bindActionCreators(closeTrackMenu, dispatch),
        getSavedTracksAction: bindActionCreators(GetSavedTracks, dispatch),
        SaveTracksAction: bindActionCreators(SaveTracks, dispatch),
        removeFromTracksAction: bindActionCreators(RemoveFromTracks, dispatch),
        getPredominantColorAction: bindActionCreators(getPredominantColor, dispatch),
        searchAction: bindActionCreators(Search, dispatch),
        getPreviewUrlAction: bindActionCreators(getPreviewUrl, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Playlist);