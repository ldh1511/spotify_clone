import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './styles.css';
import { connect } from 'react-redux';
import CardList from '../../components/CardList';
import AlbumBlock from '../../components/AlbumBlock';
import { getAlbumTracks, GetSavedALbums, removeAlbums, RemoveFromTracks, saveAlbums, SaveTracks } from '../../redux/actions/info';
import { bindActionCreators } from 'redux';
import { useHistory } from 'react-router';
Albums.propTypes = {
    albums: PropTypes.object,
    getAlbumTracksAction: PropTypes.func,
    albumtracks: PropTypes.array
};
Albums.defaultProps = {
    albums: [],
    albumtracks: [],
    singles: [],
    savedAlbums:{
        items:[]
    }
}
function Albums(props) {
    const history = useHistory();
    const [list, setList] = useState(false);
    const {
        albums, name, getAlbumTracksAction, albumtracks, location, singles,
        SaveTracksAction, removeFromTracksAction, savedTracks,
        saveAlbumsAction, getSavedAlbumsAction,savedAlbums,
        removeAlbumsAction
    } = props;
    const {items}=savedAlbums;
    const pathname = location.pathname.split('/');
    const match = pathname[pathname.length - 1];
    const [type, setType] = useState(match);
    const renderCardListTable = () => {
        let xhtml = null;
        xhtml = (
            <CardList
                data={type === 'albums' ? albums : singles}
                type='album'
            />
        )
        return xhtml;
    }
    let data = type === 'albums' ? albums : singles;
    useEffect(() => {
        const getData = () => {
            let idArr = [];
            data.map((item) => {
                idArr.push(item.id)
                return true;
            })
            return idArr
        }
        getAlbumTracksAction(getData())
        getSavedAlbumsAction();
    }, [type, getAlbumTracksAction, data])
    const renderCardList = () => {
        let xhtml = null;
        xhtml = (
            <div className="album-blocks">
                {type === 'albums' ?
                    albumtracks.map((item, i) => (
                        <AlbumBlock
                            data={[item.data.items, albums[i]]}
                            SaveTracksAction={SaveTracksAction}
                            removeFromTrack={removeFromTracksAction}
                            savedTracks={savedTracks}
                            saveAlbums={saveAlbumsAction}
                            removeAlbums={removeAlbumsAction}
                            check={items.filter((item) =>item.album.id===albums[i].id)}
                        />
                    )) :
                    albumtracks.map((item, i) => (
                        <AlbumBlock
                            data={[item.data.items, singles[i]]}
                            SaveTracksAction={SaveTracksAction}
                            removeFromTrack={removeFromTracksAction}
                            savedTracks={savedTracks}
                            saveAlbums={saveAlbumsAction}
                            check={items.filter((item) =>item.album.id===singles[i].id)}
                        />
                    ))
                }
            </div>
        )
        return xhtml;
    }
    const handleSelectType = (e) => {
        const { value } = e.target;
        setType(value);
        pathname[pathname.length - 1] = value;
        let newUrl = pathname.join('/');
        history.replace({ pathname: newUrl })
    }
    return (
        <div className="albums">
            <div className="albums-filter">
                <h2>{name}</h2>
                <div className="albums-filter-right">
                    <select
                        className="select-box"
                        name="select"
                        value={type}
                        onChange={(e) => handleSelectType(e)}
                    >
                        <option value='albums'>Album</option>
                        <option value='singles'>Single</option>
                    </select>
                    <div className="filter-block">
                        <i className="fas fa-list-ul" onClick={() => { setList(true) }}></i>
                        <i className="fas fa-border-all" onClick={() => { setList(false) }}></i>
                    </div>
                </div>
            </div>
            {list === true ? renderCardList() : renderCardListTable()}
        </div>
    );
}
const mapStateToProps = (state) => {
    return {
        albums: state.artist.albums,
        singles: state.artist.singles,
        name: state.artist.artistInfo.name,
        albumtracks: state.artist.albumtracks,
        savedTracks: state.tracks.savedTracks,
        savedAlbums:state.album.savedAlbums
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getAlbumTracksAction: bindActionCreators(getAlbumTracks, dispatch),
        SaveTracksAction: bindActionCreators(SaveTracks, dispatch),
        removeFromTracksAction: bindActionCreators(RemoveFromTracks, dispatch),
        getSavedAlbumsAction: bindActionCreators(GetSavedALbums, dispatch),
        saveAlbumsAction: bindActionCreators(saveAlbums, dispatch),
        removeAlbumsAction: bindActionCreators(removeAlbums, dispatch),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Albums);