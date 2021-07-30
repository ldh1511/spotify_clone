import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';
import { NavLink } from 'react-router-dom';
AlbumBlockHeader.propTypes = {
    data: PropTypes.object,
};
AlbumBlockHeader.defaultProps = {
    data: {
        release_date: '',
        images: [{ url: '' }]
    }
}
function AlbumBlockHeader(props) {
    const { data, saveAlbums, check, removeAlbums } = props;
    const { name, release_date, album_type, total_tracks, images, id } = data;
    const handleSaveAlbums = () => {
        if(check===false){
            saveAlbums(id,data);
        }
        else{
            removeAlbums(id);
        }
    }
    return (
        <div className="album-block--header">
            <img alt="" src={images[0].url} />
            <div className="album-block-title">
                <div className="album-block-title--top">
                    <NavLink to={`/album/${id}`}><h2>{name}</h2></NavLink>
                    <ul>
                        <li>{album_type}</li>|
                        <li>{release_date.split('-')[0]}</li>|
                        <li>{total_tracks} bài hát</li>
                    </ul>
                </div>
                <div className="album-block-btn">
                    <button className="play-btn btn-active">
                        <i className="fas fa-play"></i>
                    </button>
                    <i
                        className={check === true ? `fas fa-heart active` : `far fa-heart `}
                        onClick={() => handleSaveAlbums()}>
                    </i>
                </div>
            </div>
        </div>
    );
}

export default AlbumBlockHeader;