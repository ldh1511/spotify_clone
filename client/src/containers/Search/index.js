import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';
Search.propTypes = {
    
};

function Search(props) {
    return (
        <div className="search-container">
            <div className="categories">
                <div className="category-item">
                    <img alt="" src="https://i.scdn.co/image/ab67706f0000000378c5761cf4e4fd410356c854"></img>
                    <h3>Podcast</h3>
                </div>
                <div className="category-item">
                    <img alt="" src="https://i.scdn.co/image/ab67706f0000000378c5761cf4e4fd410356c854"></img>
                    <h3>Podcast</h3>
                </div>
                <div className="category-item">
                    <img alt="" src="https://i.scdn.co/image/ab67706f0000000378c5761cf4e4fd410356c854"></img>
                    <h3>Podcast</h3>
                </div>
                <div className="category-item">
                    <img alt="" src="https://i.scdn.co/image/ab67706f0000000378c5761cf4e4fd410356c854"></img>
                    <h3>Podcast</h3>
                </div>
                <div className="category-item">
                    <img alt="" src="https://i.scdn.co/image/ab67706f0000000378c5761cf4e4fd410356c854"></img>
                    <h3>Podcast</h3>
                </div>
            </div>
        </div>
    );
}

export default Search;