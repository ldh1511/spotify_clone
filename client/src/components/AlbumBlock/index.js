import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';
import AlbumBlockHeader from '../AlbumBlockHeader';
import TrackTable from '../TrackTable';
AlbumBlock.propTypes = {
    data: PropTypes.array
};
function AlbumBlock(props) {
    const { 
        data, SaveTracksAction, 
        removeFromTrack, savedTracks, 
        saveAlbums, check,
        removeAlbums } = props;
    return (
        <div className="album-block">
            <AlbumBlockHeader 
            data={data[1]} 
            saveAlbums={saveAlbums}
            removeAlbums={removeAlbums}
            check={check.length===1? true:false}
            />
            <TrackTable
                data={data[0]} note='album-track'
                SaveTracksAction={SaveTracksAction}
                removeFromTrack={removeFromTrack}
                savedTracks={savedTracks}
            />
        </div>
    );
}

export default AlbumBlock;