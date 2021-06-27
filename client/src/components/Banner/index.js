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
    const { name, description, image, owner, type, followed } = props;
    console.log(followed)
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
                {type === 'artist' ?
                    <button className={followed===true?'followed follow-btn':'follow-btn'}>
                        {followed===true?'Followed':'Follow'}
                    </button>
                    :
                    <></>
                }

            </div>
        </div>
    );
}

export default Banner;