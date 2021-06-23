import React from 'react';
import PropTypes from 'prop-types';
import './styles.css'
const convert = 0.000016667;

PlaylistTable.propTypes = {
    data: PropTypes.array
};
PlaylistTable.defaultProps = {
    data: []
}
function PlaylistTable(props) {
    const { data } = props
    console.log(data);
    const getNameOfArtist = (data) => {
        let result = "";
        data.map(item => {
            result += `${item.name}, `
        })
        return result
    }
    const renderElement = () => {
        let xhtml = null;
        if (data) {
            xhtml = data.map((item, i) => (
                <>
                    {item.track ?
                        (<tr>
                            <td>{i}</td>
                            <td className="track-info">
                                <img alt="" src={item.track.album.images[0].url} />
                                <div className="track-info-right">
                                    <h3>{item.track.name}</h3>
                                    <span>{getNameOfArtist(item.track.artists)}</span>
                                </div>
                            </td>
                            <td className="track-album">{item.track.album.name}</td>
                            <td>{item.added_at.split('T')[0]}</td>
                            <td>{(Math.round((item.track.duration_ms * convert) * 100) / 100).toFixed(2)}</td>
                        </tr>
                        ) : (
                            <tr style={{gridTemplateColumns:'5% 90% 5%'}}>
                                <td>{i}</td>
                                <td className="track-info">
                                    <img alt="" src={item.album.images[0].url} />
                                    <div className="track-info-right">
                                        <h3>{item.name}</h3>
                                        <span>{getNameOfArtist(item.artists)}</span>
                                    </div>
                                </td>
                                <td>{(Math.round((item.duration_ms * convert) * 100) / 100).toFixed(2)}</td>
                            </tr>
                        )
                    }
                </>
            ))
        }

        return xhtml
    }
    return (
        <div className="playlist-table">
            <table>
                {data[0].track?
                    <tr>
                        <th>#</th>
                        <th>tiêu đề</th>
                        <th>album</th>
                        <th>ngày thêm</th>
                        <th><i className="far fa-clock"></i></th>
                    </tr>
                    :
                    <></>
                }
                <thead>
                    
                </thead>
                <tbody>
                    {renderElement()}
                </tbody>
            </table>
        </div>
    );
}

export default PlaylistTable;