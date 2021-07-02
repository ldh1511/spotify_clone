import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './styles.css';
Banner.propTypes = {
    name: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    owner: PropTypes.string,
    follow: PropTypes.func,
    unfollow: PropTypes.func,
};
function Banner(props) {
    const { name, description, image, owner, type, followed, id, follow, unfollow, custom, openModal } = props;
    const [followState, setFollowState] = useState(followed);
    useEffect(() => {
        setFollowState(followed);
    }, [followed])
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
                {image !== '' ?
                    <img alt="" src={image}></img>
                    :
                    <div className="custom-img" onClick={()=>openModal()}>
                        <svg className="custom-img--off" height="128" role="img" width="128" viewBox="-20 -25 100 100"
                            className="_0de6546a8c9a0ed2cc34a83aa2c4a47a-scss beabeff74fb6ea16fdd40b8a78d9aeda-scss" aria-hidden="true" data-testid="card-image-fallback"><path d="M16 7.494v28.362A8.986 8.986 0 0 0 9 32.5c-4.962 0-9 4.038-9 9s4.038 9 9 9 9-4.038 9-9V9.113l30-6.378v27.031a8.983 8.983 0 0 0-7-3.356c-4.962 0-9 4.038-9 9 0 4.963 4.038 9 9 9s9-4.037 9-9V.266L16 7.494zM9 48.5c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7c0 3.859-3.141 7-7 7zm32-6.09c-3.86 0-7-3.14-7-7 0-3.859 3.14-7 7-7s7 3.141 7 7c0 3.861-3.141 7-7 7z " fill="currentColor" fill-rule="evenodd"></path>
                        </svg>
                        <div className="custom-img--on">
                            <i className="fas fa-pencil-alt"></i>
                            <p>Chọn ảnh</p>
                        </div>
                    </div>

                }

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