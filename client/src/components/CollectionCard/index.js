import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';
CollectionCard.propTypes = {
    data: PropTypes.array
};
CollectionCard.defaultProps = {
    data: []
}
function CollectionCard(props) {
    const { data } = props;
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
               ...
            </p>
            <p>Bài hát đã thích</p>
            <span>56 bài hát đã thích</span>
        </div>
    );
}

export default CollectionCard;