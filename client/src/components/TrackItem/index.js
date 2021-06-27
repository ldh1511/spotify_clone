import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';
TrackItem.propTypes = {

};

function TrackItem(props) {
    const { i, name_track, add_at, duration, image, name_artist, name_album, note } = props;
    const renderItem = () => {
        let xhtml = null;
        if (note === 'search-track') {
            xhtml = (<tr style={{ gridTemplateColumns: '5% 90% 5%' }} className="track-tr">
                <td>{i+1}</td>
                <td className="track-info">
                    <img alt="" src={image} />
                    <div className="track-info-right">
                        <h3>{name_track}</h3>
                        <span>{name_artist}</span>
                    </div>
                </td>
                <td>{duration}</td>
            </tr>)
        } else if (note === 'album-track') {
            xhtml = (<tr style={{ gridTemplateColumns: '5% 90% 5%' }} className="track-tr">
                <td>{i+1}</td>
                <td className="track-info">
                    <div className="track-info-right">
                        <h3>{name_track}</h3>
                    </div>
                </td>
                <td>{duration}</td>
            </tr>)
        } else {
            xhtml = (<tr>
                <td>{i+1}</td>
                <td className="track-info">
                    <img alt="" src={image} />
                    <div className="track-info-right">
                        <h3>{name_track}</h3>
                        <span>{name_artist}</span>
                    </div>
                </td>
                <td className="track-album">{name_album}</td>
                <td>{add_at}</td>
                <td>
                    {duration}
                </td>
            </tr>)
        }
        return xhtml;
    }
    return (
        <>
            {renderItem()}
        </>
    );
}

export default TrackItem;