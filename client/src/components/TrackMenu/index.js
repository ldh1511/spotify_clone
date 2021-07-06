import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';
import { bindActionCreators } from 'redux';
import { closeTrackMenu } from '../../redux/actions/ui';
import { SaveTracks } from '../../redux/actions/info';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
TrackMenu.propTypes = {

};
TrackMenu.defaultProps = {
    idArtists:[],
    nameArtists:[],
}
function TrackMenu(props) {
    const { stateTrackMenu, closeTrackMenu, albumId, nameArtists, idArtists, SaveTracksAction, idTracks, dataTracks } = props;
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
    const handleSaveTrack=()=>{
        SaveTracksAction(idTracks,dataTracks);
        closeTrackMenu();
    }
    return (
        <div className={stateTrackMenu === true ? "track-menu" : "track-menu hidden"}>
            <i className="fas fa-times" onClick={() => closeTrackMenu()}></i>
            <ul>
                <li onClick={() => handleSaveTrack()}>Lưu vào Bài hát đã thích của bạn</li>
                <li onClick={() => closeTrackMenu()}><NavLink to={`/album/${albumId}`}>Chuyển tới album</NavLink></li>
                <li onClick={() => closeTrackMenu()}>
                    Chuyển tới nghệ sĩ
                    {renderSubMenu()}
                </li>
                <li onClick={() => closeTrackMenu()}>test</li>
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
        dataTracks:state.ui.dataTracks
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        closeTrackMenu: bindActionCreators(closeTrackMenu, dispatch),
        SaveTracksAction: bindActionCreators(SaveTracks, dispatch),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TrackMenu);