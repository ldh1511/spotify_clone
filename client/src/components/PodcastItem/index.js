import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';
PodcastItem.propTypes = {
    data:PropTypes.object
};
PodcastItem.defaultProps = {
    data:{}
}
function PodcastItem(props) {
    const {data, getPreviewUrl, listData}=props;
    const {name, description, release_date}=data;
    const date=release_date.split('-');
    const handlePlayAudio = ()=>{
        getPreviewUrl(data,listData)
    }
    let curDate=new Date();
    let curYear=curDate.getFullYear();
    return (
        <li className="podcast-item">
            <img alt="" src="https://i.scdn.co/image/ab6765630000ba8af0ac6fb61b796aed7347f27d"></img>
            <div className="podcast-item--detail">
                <h4>{name}</h4>
                <p>{description}</p>
                <div className="podcast-item--btn">
                    <button onClick={()=>handlePlayAudio()}>
                        <i className="fas fa-play"></i>
                    </button>
                    <p>
                        {date[date.length-1]} thg {date[date.length-2]} {date[0]===curYear?'':date[date.length-3]}
                    </p>
                </div>
            </div>
        </li>
    );
}

export default PodcastItem;