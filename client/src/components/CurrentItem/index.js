import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
CurrentItem.propTypes = {
    name: PropTypes.string,
    id: PropTypes.string,
    images: PropTypes.object
};
CurrentItem.defaultProps = {
    name: '',
    id: '',
    images: {
        url: ''
    }
}
function CurrentItem(props) {
    const { name, images, id, getPreviewUrl, getTracksInPlaylist, tracks } = props;
    useEffect(() => {
        if (getPreviewUrl && tracks && tracks.playlistInfo && tracks.playlistInfo.id === id) {
            getPreviewUrl(tracks.tracksInPlaylist[0], tracks.tracksInPlaylist)
        }
    }, [tracks, getPreviewUrl, id])
    const handlePlayAudio = () => {
        getTracksInPlaylist(id);
    }
    return (
        <div className="current-list--item">
            <button className="play-btn" onClick={() => handlePlayAudio()}>
                <i className="fas fa-play"></i>
            </button>
            <NavLink to={`/playlist/${id}`}>
                <img alt="" src={images.url}></img>
                <h2>{name}</h2>
            </NavLink>
        </div>
    );
}

export default CurrentItem;