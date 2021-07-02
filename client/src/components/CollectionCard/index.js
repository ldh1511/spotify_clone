import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';
CollectionCard.propTypes = {
    data: PropTypes.array
};
CollectionCard.defaultProps = {
    data: [],
    type:''
}
function CollectionCard(props) {
    const { data, type } = props;
    const renderTracks = () => {
        let xhtml = null;
        let newData=data.slice(0,5);
        xhtml = newData.map(item =>
        (
            <>
               {item.track.artists[0].name} <span>{item.track.name}</span>
               <i className="fas fa-circle"></i>
            </>
        ))
        return xhtml
    }
    return (
        <div className="collection-card">
            <p className="collection-card--content">
               {renderTracks()}
               {data.length>0?'...':''}
            </p>
            <p>{type==='playlists'? 'Bài hát đã thích':'Tập của bạn'}</p>
            <span>{data.length} {type==='playlists'?'bài hát đã thích':'tập đã thích'}</span>
        </div>
    );
}

export default CollectionCard;