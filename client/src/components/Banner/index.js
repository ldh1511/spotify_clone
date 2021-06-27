import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';
Banner.propTypes = {
    name: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    owner: PropTypes.string,
};
function Banner(props) {
    const { name, description, image, owner, type } = props
    return (
        <div className="banner-top">
            <div
                className="banner-img"
                style={type === 'artist' ? { borderRadius: '50%' } : { borderRadius: '4px' }}
            >
                <img alt="" src={image}></img>
            </div>
            <div className="banner-content">
                <span>{type === 'artist' ? '' : type}</span>
                <h1>{name}</h1>
                <p>{description}</p>
                <span>{owner}</span>
            </div>
        </div>
    );
}

export default Banner;