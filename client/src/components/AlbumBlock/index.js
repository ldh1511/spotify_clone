import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';
import AlbumBlockHeader from '../AlbumBlockHeader';
import TrackTable from '../TrackTable';
AlbumBlock.propTypes = {
    data:PropTypes.array
};

function AlbumBlock(props) {
    const {data}=props;
    return (
        <div className="album-block">
           <AlbumBlockHeader data={data[1]}/>
           <TrackTable data={data[0]} note='album-track'/>
        </div>
    );
}

export default AlbumBlock;