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
    note: null,
    savedTracks: {
        items: [{ track: 'test' }]
    }
}
function TrackTable(props) {
    const { data, note, openTrackMenu, savedTracks, SaveTracksAction, removeFromTrack } = props;
    const getNameOfArtist = (data) => {
        let result = "";
        data.map(item => {
            result += `${item.name}, `;
            return true;
        });
        return result
    }
    const getIdOfArtist = (data) => {
        let result = "";
        data.map(item => {
            result += `${item.id}, `;
            return true;
        });
        return result
    }
    const renderElement = () => {
        let xhtml = null;
        if (data.length > 0 && savedTracks.items.length > 0) {
            xhtml = data.map((item, i) => {
                let checked = false;
                let check = savedTracks.items.filter(
                    track => (track.track.id === item.id) || (item.track && track.track.id === item.track.id)
                );
                if (check.length > 0) { checked = true }
                return (<>{item.track ?
                    (<TrackItem
                        key={i}
                        i={i}
                        id={item.track.id}
                        albumId={item.track.album && item.track.album.id ?item.track.album.id:''}
                        image={item.track.album && item.track.album.images? item.track.album.images[0].url:''}
                        name_track={item.track.name}
                        name_album={item.track.album ? item.track.album.name:''}
                        name_artist={getNameOfArtist(item.track.artists)}
                        id_artist={getIdOfArtist(item.track.artists)}
                        add_at={item.added_at.split('T')[0]}
                        openTrackMenu={openTrackMenu}
                        duration={
                            (Math.round((item.track.duration_ms * convert) * 100) / 100).toFixed(2)
                        }
                        checked={checked}
                        SaveTracksAction={SaveTracksAction}
                        removeFromTrack={removeFromTrack}
                        data={item}
                    />) :
                    (<TrackItem
                        key={i}
                        i={i}
                        id={item.id}
                        image={note !== 'album-track' ? item.album.images[0].url : null}
                        name_track={item.name}
                        name_artist={getNameOfArtist(item.artists)}
                        id_artist={getIdOfArtist(item.artists)}
                        duration={
                            (Math.round((item.duration_ms * convert) * 100) / 100).toFixed(2)
                        }
                        openTrackMenu={openTrackMenu}
                        note={note ? `${note}` : 'search-track'}
                        checked={checked}
                        SaveTracksAction={SaveTracksAction}
                        removeFromTrack={removeFromTrack}
                        data={item}
                    />)
                }
                </>)
            })
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
                    : <></>
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