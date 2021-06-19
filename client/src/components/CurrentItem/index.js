import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
CurrentItem.propTypes = {
    name: PropTypes.string,
    id: PropTypes.string,
    images: PropTypes.object
};
CurrentItem.defaultProps = {
    name: '',
    id:'',
    images: {
        url: ''
    }
}

function CurrentItem(props) {
    const { name, images, id } = props;
    return (
        <div className="current-list--item">
            <NavLink to={`/playlist/${id}`}>
                <img alt="" src={images.url}></img>
                <h2>{name}</h2>
                <button className="play-btn"><i className="fas fa-play"></i></button>
            </NavLink>
        </div>
    );
}

export default CurrentItem;