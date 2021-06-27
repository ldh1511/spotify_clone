import React from 'react';
import PropTypes from 'prop-types';
import './styles.css'
import TrackItem from '../TrackItem';
const convert = 0.000016667;

TrackTable.propTypes = {
    data: PropTypes.array
};
TrackTable.defaultProps = {
    data: [],
    note:null
}
function TrackTable(props) {
    const { data, note } = props
    const getNameOfArtist = (data) => {
        let result = "";
        data.map(item => {result += `${item.name}, `})
        return result
    }
    const renderElement = () => {
        let xhtml = null;
        if (data) {
            xhtml = data.map((item, i) => (
                <>{item.track ?
                    (<TrackItem
                        key={i}
                        i={i}
                        image={item.track.album.images[0].url}
                        name_track={item.track.name}
                        name_album={item.track.album.name}
                        name_artist={getNameOfArtist(item.track.artists)}
                        add_at={item.added_at.split('T')[0]}
                        duration={
                            (Math.round((item.track.duration_ms * convert) * 100) / 100).toFixed(2)
                        }
                    />) :
                    (<TrackItem
                        key={i}
                        i={i}
                        image={note!=='album-track'?item.album.images[0].url:null}
                        name_track={item.name}
                        name_artist={getNameOfArtist(item.artists)}
                        duration={
                            (Math.round((item.duration_ms * convert) * 100) / 100).toFixed(2)
                        }
                        note={note?`${note}`:'search-track'}
                    />)
                }</>
            ))
        }
        return xhtml
    }
    const renderHeader = () => {
        let xhtml = null;
        if (data[0]) {
            xhtml = (<thead>
                {data[0].track !== undefined ?
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
            </thead>)
        }
        return xhtml;
    }
    return (
        <div className="playlist-table">
            <table>
                {renderHeader()}
                <tbody>
                    {renderElement()}
                </tbody>
            </table>
        </div>
    );
}

export default TrackTable;