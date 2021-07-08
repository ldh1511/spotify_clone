import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';
CollectionSearchItem.propTypes = {
    type: PropTypes.string
};
CollectionSearchItem.defaultProps = {
    data: {
        images: [{ url: '' }]
    }
}
function CollectionSearchItem(props) {
    const { data, setLevelData, defaultimg, addItem, idPlaylist } = props;
    const { type, name, images, id, uri } = data;
    console.log(data);
    let newImage = images && images.length !== 0 ? images : [{ url: '' }];
    let albumImage = data.album && data.album.images && data.album.images.length !== 0 ? data.album.images : [{ url: defaultimg }]
    const renderDescription = () => {
        let description = null;
        if (type === 'artist') {
            description = 'Nghệ sĩ'
        }
        else if (type === 'track') {
            description = data.artists[0].name
        }
        else if (type === 'album') {
            description = 'Album'
        }
        else {
            description = ''
        }
        return description;
    }
    const handleClick = (idData, typeData) => {
        switch (typeData) {
            case 'artist':
                setLevelData(2, typeData, idData)
                break;
            case 'album':
                setLevelData(3, typeData, idData, newImage[0].url,name)
                break;
            case 'track':
                break;
            default:
                break;
        }
    }
    return (
        <div className="collection-search--item" onClick={() => handleClick(id, type)}>
            <div className="search-item--left">
                <img alt="" src={type === 'track' ? albumImage[0].url : newImage[0].url}
                    className={type === "artist" ? "seach-item--artist" : ""}
                ></img>
                <div className="search-item--content">
                    <h4>{name}</h4>
                    <p>{renderDescription()}</p>
                </div>
            </div>
            <div className="search-item--center">
                <p>{type === 'track' && data.album && data.album.name ? data.album.name : ''}</p>
            </div>
            <div className="search-item--right">
                {type !== "track" ?
                    <i className="fas fa-chevron-right"></i> :
                    <button onClick={() => addItem(idPlaylist,uri, data)}>Thêm</button>
                }
            </div>
        </div>
    );
}

export default CollectionSearchItem;