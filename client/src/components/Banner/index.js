import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './styles.css';
Banner.propTypes = {
    name: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    owner: PropTypes.string,
    follow:PropTypes.func,
    unfollow:PropTypes.func,
};
function Banner(props) {
    const { name, description, image, owner, type, followed, id, follow, unfollow } = props;
    const [followState, setFollowState]=useState(followed);
    useEffect(()=>{
        setFollowState(followed);
    },[followed])
    const handleFollow = (stateFollow) => {
        if (stateFollow === true) {
            unfollow(id)
            setFollowState(false);
        }
        else {
            follow(id);
            setFollowState(true);
        }
    }
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
                    <button
                        onClick={() => handleFollow(followState)}
                        className={followState === true ? 'followed follow-btn' : 'follow-btn'}
                    >
                        {followState === true ? 'Followed' : 'Follow'}
                    </button>
                    :
                    <></>
                }

            </div>
        </div>
    );
}

export default Banner;