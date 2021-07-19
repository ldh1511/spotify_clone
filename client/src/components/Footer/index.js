import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import './styles.css';
import { getNameOfArtist } from '../../constants/actions';
import TimeSlider from "react-input-slider";
Footer.propTypes = {
    audio: PropTypes.object
};
Footer.defaultProps = {
    preview_url: null,
    currentTrack: {
        track: {
            album: {
                images: [{ url: '' }]
            },
            artists: [{ name: '' }]
        }
    },
    list_url: [],
    list_data: [
        {
            name: '',
            artists: [{ name: '' }],
            album: { images: [{ url: '' }] },
            duration_ms: 0
        }
    ],
}

function Footer(props) {
    const { list_url, list_data } = props;
    const audioRef = useRef();
    const [audioIndex, setAudioIndex] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isPlay, setPlay] = useState(false);
    const handleLoadedData = () => {
        setDuration(audioRef.current.duration);
        if (isPlay) audioRef.current.play();
    };

    const handlePausePlayClick = () => {
        if (isPlay) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setPlay(!isPlay);
    };

    const handleTimeSliderChange = ({ x }) => {
        audioRef.current.currentTime = x;
        setCurrentTime(x);
        if (!isPlay) {
            setPlay(true);
            audioRef.current.play();
        }
    };
    return (
        <div className="footer">
            <div className="footer-left">
                <img alt="" src={list_data[audioIndex].album.images[0].url} />
                <div className="footer-left--content">
                    <h4>{list_data[audioIndex].name}</h4>
                    <span>{getNameOfArtist(list_data[audioIndex].artists)}</span>
                </div>
                <div className="footer-left--icon">
                    <i className="far fa-heart"></i>
                </div>
            </div>
            <div className="footer-center">
                <div className="footer-center--top">
                    <i className="far fa-heart"></i>
                    <i className="fas fa-step-backward"
                        onClick={() => setAudioIndex((audioIndex - 1) % list_url.length)}
                    ></i>
                    <button className="icon-play" onClick={handlePausePlayClick}>
                        {isPlay ?
                            <i className="fas fa-pause"></i> :
                            <i className="fas fa-play"></i>
                        }
                    </button>
                    <i className="fas fa-step-forward"
                        onClick={() => setAudioIndex((audioIndex + 1) % list_url.length)}
                    ></i>
                    <i className="fas fa-sync-alt"></i>
                </div>
                <div className="footer-center--bottom">
                    <TimeSlider
                        axis="x"
                        xmax={duration}
                        x={currentTime}
                        onChange={handleTimeSliderChange}
                        styles={{
                            track: {
                                width: '300px',
                                backgroundColor: "#424141",
                                height: "2px",
                            },
                            active: {
                                backgroundColor: "#cacaca",
                                height: "2px",
                            },
                            thumb: {
                                width: "10px",
                                height: "10px",
                                backgroundColor: "#cacaca",
                                borderRadius: '50%',
                            },
                        }}
                    />
                </div>

            </div>
            <div className="footer-right">
                <div className="volum-box">
                    <i className="fas fa-volume-up"></i>
                    <div className="volumn">
                        test
                    </div>
                </div>
            </div>
            <audio
                ref={audioRef}
                src={list_url[audioIndex]}
                onLoadedData={handleLoadedData}
                onTimeUpdate={() => setCurrentTime(audioRef.current.currentTime)}
                onEnded={() => setPlay(false)}
            />
        </div>
    );
}

export default Footer;