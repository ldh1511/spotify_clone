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
    cur_index: 0,
    savedTracks: { items: [] },
    savedEpisodes: { items: [] }
}

function Footer(props) {
    const { list_url, list_data, cur_index, addNoti, hideNoti, savedTracks,
        SaveTracksAction, removeFromTracksAction, SaveEpisodesAction,
        savedEpisodes, RemoveEpisodesAction } = props;
    const { items } = savedTracks;
    const audioRef = useRef();
    const [audioIndex, setAudioIndex] = useState(cur_index);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isPlay, setPlay] = useState(false);
    useEffect(() => {
        setAudioIndex(cur_index)
    }, [cur_index]);
    useEffect(() => {
        if (duration === currentTime && list_url.length > 0 && duration > 0 && currentTime > 0) {
            setAudioIndex(a => {
                if (a + 1 > list_url.length - 1) {
                    return 0
                }
                else {
                    return a + 1
                }
            })
        }
    }, [currentTime, duration, list_url])
    useEffect(() => {
        if (list_url[audioIndex] === null && audioIndex) {
            addNoti(`${list_data[audioIndex].name} has no preview, move to next track`);
            setTimeout(() => {
                hideNoti();
            }, 2000)
            setAudioIndex(a => {
                if (a + 1 > list_url.length - 1) {
                    return 0
                }
                else {
                    return a + 1
                }
            })
        }
    }, [audioIndex, list_url, addNoti, hideNoti, list_data])
    const handleLoadedData = () => {
        setDuration(audioRef.current.duration);
        if (isPlay) audioRef.current.play();
    };
    const handlePausePlayClick = () => {
        if (isPlay) { audioRef.current.pause(); }
        else { audioRef.current.play(); }
        setPlay(!isPlay);
    };
    const handleCheckSave = (track) => {
        let check = []
        if (items && items[0] && items[0].track) {
            check = items.filter(item => item.track.id === track.id);
        }
        else if (savedEpisodes.items && savedEpisodes.items[0] && savedEpisodes.items[0].episode) {
            check = savedEpisodes.items.filter(item => item.episode.id === track.id)
        }
        return check;
    }
    const handleTimeSliderChange = ({ x }) => {
        audioRef.current.currentTime = x;
        setCurrentTime(x);
        if (!isPlay) {
            setPlay(true);
            audioRef.current.play();
        }
    };
    const handleIncrementIndex = () => {
        if (audioIndex === list_data.length - 1) {
            setAudioIndex(0);
        }
        else {
            setAudioIndex(audioIndex + 1);
        }
    }
    const handleDecrementIndex = () => {
        if (audioIndex > 0) {
            setAudioIndex(audioIndex - 1);
        }
    }
    const handleSaveTrack = () => {
        let newData =
            list_data[audioIndex].artists ?
                { track: list_data[audioIndex] } :
                { episode: list_data[audioIndex] }
        list_data[audioIndex].artists ?
            handleCheckSave(list_data[audioIndex]).length===1 ?
                removeFromTracksAction(list_data[audioIndex].id) :
                SaveTracksAction(list_data[audioIndex].id, newData)
            :
            handleCheckSave(list_data[audioIndex]).length===1 ?
                RemoveEpisodesAction(list_data[audioIndex].id) :
                SaveEpisodesAction(list_data[audioIndex].id, newData)
    }
    const renderName=(name)=>{
        if(name.length>20){
            let newString=name.slice(0,20);
            newString=newString + '...';
            return newString
        }
        else{
            return name
        }
    }
    return (
        <div className="footer" style={list_url.length > 0 ? { display: 'grid' } : { display: 'none' }}>
            <div className="footer-left">
                <img alt="" src={
                    list_data[audioIndex] && list_data[audioIndex].album ?
                        list_data[audioIndex].album.images[0].url :
                        list_data[audioIndex].images[0].url
                } />
                <div className="footer-left--content">
                    <h4>{renderName(list_data[audioIndex].name)}</h4>
                    <span>
                        {
                            list_data[audioIndex].artists ?
                            getNameOfArtist(list_data[audioIndex].artists) : ''
                        }
                    </span>
                </div>
                <div className="footer-left--icon">
                    <i
                        className={handleCheckSave(list_data[audioIndex]).length===1 ?
                            "fas fa-heart active" : "far fa-heart"
                        }
                        onClick={() => handleSaveTrack()}
                    >
                    </i>
                </div>
            </div>
            <div className="footer-center">
                <div className="footer-center--top">
                    <i className="fas fa-step-backward"
                        onClick={() => handleDecrementIndex()}
                    ></i>
                    <button className="icon-play" onClick={handlePausePlayClick}>
                        {isPlay ?
                            <i className="fas fa-pause"></i> :
                            <i className="fas fa-play"></i>
                        }
                    </button>
                    <i className="fas fa-step-forward"
                        onClick={() => handleIncrementIndex()}
                    ></i>
                </div>
                <div className="footer-center--bottom">
                    <TimeSlider
                        axis="x"
                        xmax={duration}
                        x={currentTime}
                        onChange={handleTimeSliderChange}
                        styles={{
                            track: {
                                width: '325px',
                                backgroundColor: "#424141",
                                height: "5px",
                            },
                            active: {
                                backgroundColor: "#cacaca",
                                height: "5px",
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