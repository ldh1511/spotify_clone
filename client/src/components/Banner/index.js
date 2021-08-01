import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useColor } from 'color-thief-react'
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
    const { name, description,
        image, owner,
        type, followed,
        id, follow,
        unfollow, custom,
        openModal, getCurImg, currentImg,
        getPredominantColor, predominantColor } = props;
    const [followState, setFollowState] = useState(followed);
    let crossOrigin = "Anonymous";
    const { data } = useColor(image, 'hex', { crossOrigin });
    useEffect(() => {
        setFollowState(followed);
    }, [followed])
    useEffect(() => {
        if (image !== '' && data !== undefined) {
            getPredominantColor(data);
        }
        else{
            getPredominantColor('#333333');
        }
    }, [data,getPredominantColor,image])
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
    const handleOpenModal = () => {
        openModal();
        getCurImg(image);
    }
    return (
        <div className="banner-top" style={{ backgroundColor: `${predominantColor}` }}>
            <div
                className="banner-img"
                style={type === 'artist' ? { borderRadius: '50%' } : { borderRadius: '25px' }}
            >
                {custom !== true ?
                    <>
                        {image !== '' ?
                            <img alt="" src={image}></img> :
                            <svg width="76" height="76" fill="currentColor" viewBox="0 0 18 20" xmlns="http://www.w3.org/2000/svg" data-testid="user-icon"><path d="M15.216 13.717L12 11.869C11.823 11.768 11.772 11.607 11.757 11.521C11.742 11.435 11.737 11.267 11.869 11.111L13.18 9.57401C14.031 8.58001 14.5 7.31101 14.5 6.00001V5.50001C14.5 3.98501 13.866 2.52301 12.761 1.48601C11.64 0.435011 10.173 -0.0879888 8.636 0.0110112C5.756 0.198011 3.501 2.68401 3.501 5.67101V6.00001C3.501 7.31101 3.97 8.58001 4.82 9.57401L6.131 11.111C6.264 11.266 6.258 11.434 6.243 11.521C6.228 11.607 6.177 11.768 5.999 11.869L2.786 13.716C1.067 14.692 0 16.526 0 18.501V20H1V18.501C1 16.885 1.874 15.385 3.283 14.584L6.498 12.736C6.886 12.513 7.152 12.132 7.228 11.691C7.304 11.251 7.182 10.802 6.891 10.462L5.579 8.92501C4.883 8.11101 4.499 7.07201 4.499 6.00001V5.67101C4.499 3.21001 6.344 1.16201 8.699 1.00901C9.961 0.928011 11.159 1.35601 12.076 2.21501C12.994 3.07601 13.5 4.24301 13.5 5.50001V6.00001C13.5 7.07201 13.117 8.11101 12.42 8.92501L11.109 10.462C10.819 10.803 10.696 11.251 10.772 11.691C10.849 12.132 11.115 12.513 11.503 12.736L14.721 14.585C16.127 15.384 17.001 16.884 17.001 18.501V20H18.001V18.501C18 16.526 16.932 14.692 15.216 13.717Z"></path></svg>
                        }
                    </>

                    :
                    <div className="custom-img" onClick={() => handleOpenModal()}>
                        {image === '' ?
                            <>
                                <svg className="custom-img--off" height="128" role="img" width="128" viewBox="-20 -25 100 100"
                                    data-testid="card-image-fallback"><path d="M16 7.494v28.362A8.986 8.986 0 0 0 9 32.5c-4.962 0-9 4.038-9 9s4.038 9 9 9 9-4.038 9-9V9.113l30-6.378v27.031a8.983 8.983 0 0 0-7-3.356c-4.962 0-9 4.038-9 9 0 4.963 4.038 9 9 9s9-4.037 9-9V.266L16 7.494zM9 48.5c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7c0 3.859-3.141 7-7 7zm32-6.09c-3.86 0-7-3.14-7-7 0-3.859 3.14-7 7-7s7 3.141 7 7c0 3.861-3.141 7-7 7z " fill="currentColor" fillRule="evenodd"></path>
                                </svg>
                                <div className="custom-img--on">
                                    <i className="fas fa-pencil-alt"></i>
                                    <p>Chọn ảnh</p>
                                </div>
                            </> :
                            <>
                                <img className="custom-img--off" alt="" src={image}></img>
                                <div className="custom-img--on">
                                    <i className="fas fa-pencil-alt"></i>
                                    <p>Chọn ảnh</p>
                                </div>
                            </>
                        }
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