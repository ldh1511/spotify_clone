import React from 'react';
import CurrentItem from '../CurrentItem';
import PropTypes from 'prop-types';
CurrentList.propTypes = {
    data: PropTypes.array,
}
CurrentList.defaultProps = {
    data: []
};

function CurrentList(props) {
    const { data, getPreviewUrl,  getTracksInPlaylist, tracks } = props;
    const renderCurrentItem = () => {
        let xhtml = null;
        xhtml = data.map(item => (
            <CurrentItem
                key={item.description}
                name={item.name}
                images={item.images[0]}
                id={item.id}
                getPreviewUrl={getPreviewUrl}
                getTracksInPlaylist={getTracksInPlaylist}
                tracks={tracks}
            />)
        )
        return xhtml
    }
    return (
        <div className="current-list">
            {renderCurrentItem()}
        </div>
    );
}

export default CurrentList;