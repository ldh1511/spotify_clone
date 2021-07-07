import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';
PodcastDescription.propTypes = {
    data:PropTypes.string
};

function PodcastDescription(props) {
    const {data}=props;
    return (
        <div className="podcast-description">
            <h2>Giới thiệu</h2>
            <p>{data}</p>
        </div>
    );
}

export default PodcastDescription;