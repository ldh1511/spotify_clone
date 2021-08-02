import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './styles.css';
import { bindActionCreators } from 'redux';
import { closeTrackMenu } from '../../redux/actions/ui';
import { SaveTracks, removeItemFromPlaylist, RemoveFromTracks } from '../../redux/actions/info';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
TrackMenu.propTypes = {
    idArtists: PropTypes.array
};
TrackMenu.defaultProps = {
    idArtists: [],
    nameArtists: [],
    playlist: [],
    currentPlaylist: {},
    savedTracks: { items: [] }
}
function TrackMenu(props) {
    const { stateTrackMenu, closeTrackMenu,
        albumId, nameArtists,
        idArtists, SaveTracksAction,
        idTracks, dataTracks, playlist, currentPlaylist,
        removeTrackAction, savedTracks,
        removeFromTracksAction } = props;
    let check = playlist.filter(item => item.id && item.id === currentPlaylist.id);
    let savedTrackCheck = savedTracks.items.filter(item => item.track.id === idTracks);

    function useOutsideAlerter(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target) && stateTrackMenu === true) {
                    closeTrackMenu();
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref, stateTrackMenu]);
    }
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);
    const renderSubMenu = () => {
        let xhtml = null;
        if (idArtists.length > 1) {
            xhtml = (<ul className="sub-menu">
                {idArtists.map((item, i) => (
                    <li key={item}>
                        <NavLink to={`/artist/${item}`}>{nameArtists[i]}</NavLink>
                    </li>
                ))}
            </ul>)
        }
        return xhtml;
    }
    const handleSaveTrack = () => {
        SaveTracksAction(idTracks, dataTracks);
        closeTrackMenu();
    }
    const handleRemoveTrack = () => {
        removeTrackAction(currentPlaylist.id, dataTracks, idTracks);
        closeTrackMenu();
    }
    const handleRemoveSavedTrack=()=>{
        removeFromTracksAction(idTracks);
        closeTrackMenu();
    }
    return (
        <div ref={wrapperRef} className={stateTrackMenu === true ? "track-menu" : "track-menu hidden"}>
            <i className="fas fa-times" onClick={() => closeTrackMenu()}></i>
            <ul>
                {check.length > 0 ?
                    <li onClick={() => handleRemoveTrack()}>Xóa khỏi danh sách phát này</li>
                    : <></>
                }
                {savedTrackCheck.length === 0 ?
                    <li onClick={() => handleSaveTrack()}>Lưu vào Bài hát đã thích của bạn</li>
                    :
                    <li onClick={() => handleRemoveSavedTrack()}>
                        Xóa khỏi Bài hát đã thích của bạn
                    </li>
                }
                <li onClick={() => closeTrackMenu()}><NavLink to={`/album/${albumId}`}>Chuyển tới album</NavLink></li>
                <li onClick={() => closeTrackMenu()}>
                    {idArtists.length === 1 ?
                        <NavLink to={`/artist/${idArtists[0]}`}>Chuyển tới nghệ sĩ</NavLink>
                        : 'Chuyển tới nghệ sĩ'
                    }
                    {renderSubMenu()}
                </li>
            </ul>
        </div>
    );
}
const mapStateToProps = (state) => {
    return {
        stateTrackMenu: state.ui.openTrackMenu,
        albumId: state.ui.albumId,
        nameArtists: state.ui.artists,
        idArtists: state.ui.idArtists,
        idTracks: state.ui.idTracks,
        dataTracks: state.ui.dataTracks,
        playlist: state.playlist.items,
        currentPlaylist: state.tracks.playlistInfo,
        savedTracks: state.tracks.savedTracks
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        closeTrackMenu: bindActionCreators(closeTrackMenu, dispatch),
        SaveTracksAction: bindActionCreators(SaveTracks, dispatch),
        removeTrackAction: bindActionCreators(removeItemFromPlaylist, dispatch),
        removeFromTracksAction: bindActionCreators(RemoveFromTracks, dispatch),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TrackMenu);