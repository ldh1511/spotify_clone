import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './styles.css';
CardItem.defaultProps = {
    name: '',
    image: '',
    description: '',
    type: '',
    tracks: {
        tracksInPlaylist: [],
        playlistInfo: { id: '' }
    }
}
function CardItem(props) {
    const { name, image, description, id, type, getTracksInPlaylist, tracks,
        getPreviewUrl, getAlbum, albumInfo } = props;
    useEffect(() => {
        if (getPreviewUrl && tracks && tracks.playlistInfo && tracks.playlistInfo.id === id) {
            getPreviewUrl(tracks.tracksInPlaylist[0], tracks.tracksInPlaylist)
        }
        if (albumInfo && albumInfo.id===id){
            let newTracks=albumInfo.tracks;
            newTracks.items.map(item=>{
                item.images=albumInfo.images
                return true;
            })
            getPreviewUrl(newTracks.items[0],newTracks.items);
        }
    }, [tracks, getPreviewUrl, id, albumInfo])
    const limitdescription = (data) => {
        if (data) {
            let newstring = data.split(' ').slice(0, 7).join(' ')
            newstring += '...'
            return newstring
        }
    }
    const handlePlaySound = () => {
        if (type === 'playlist') {
            getTracksInPlaylist(id);
        }
        if (type === 'album') {
            getAlbum(id);
        }
    }
    return (
        <div className="card-item">
            {
                type === 'playlist' || type === 'album' ?
                    <button className="play-btn" onClick={() => handlePlaySound()}>
                        <i className="fas fa-play"></i>
                    </button>
                    :
                    <></>
            }
            <NavLink to={`/${type}/${id}`}>
                <div
                    className="card-item-top"
                    style={type === 'artist' ? { borderRadius: '50%' } : { borderRadius: '10px' }}
                >
                    {image !== '' ?
                        <img alt="" src={image} ></img>
                        :
                        <svg height="128" role="img" width="128" viewBox="-20 -25 100 100"
                            className="_0de6546a8c9a0ed2cc34a83aa2c4a47a-scss beabeff74fb6ea16fdd40b8a78d9aeda-scss" aria-hidden="true" data-testid="card-image-fallback"><path d="M16 7.494v28.362A8.986 8.986 0 0 0 9 32.5c-4.962 0-9 4.038-9 9s4.038 9 9 9 9-4.038 9-9V9.113l30-6.378v27.031a8.983 8.983 0 0 0-7-3.356c-4.962 0-9 4.038-9 9 0 4.963 4.038 9 9 9s9-4.037 9-9V.266L16 7.494zM9 48.5c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7c0 3.859-3.141 7-7 7zm32-6.09c-3.86 0-7-3.14-7-7 0-3.859 3.14-7 7-7s7 3.141 7 7c0 3.861-3.141 7-7 7z" fillRule="currentColor" fill-rule="evenodd"></path>
                        </svg>
                    }
                </div>
                <div className="card-item-bot">
                    <h4>{name}</h4>
                    <p>{limitdescription(description)}</p>
                </div>
            </NavLink>
        </div>
    );
}

export default CardItem;