import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './styles.css';
import CollectionSearchBar from '../../components/CollectionSearchBar';
import CollectionSearchList from '../../components/CollectionSearchList';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAlbumTracks, getArtist, addItemToPlaylist } from '../../redux/actions/info';
CollectionSearch.propTypes = {
    sortResult: PropTypes.array
};
CollectionSearch.defaultProps = {
    topTracks: [],
    topAlbums: {
        items: []
    },
    artistInfo: {
        name: ''
    },
    albumtracks: { items: [] }
}
function CollectionSearch(props) {
    const { sortResult, searchResult, getArtistAction, topTracks, topAlbums, artistInfo, getAlbumTracksAction, albumtracks, idPlaylist, addItemToPlaylistAction } = props;
    const { albums, artists, tracks } = searchResult;
    const [level, setLevel] = useState([0]);
    const [name, setName] = useState(['default']);
    const [defaultimg, setImg] = useState();
    const setLevelData = (idLevel, type, id, defaultImg) => {
        if (typeof idLevel === 'number') {
            setLevel([...level, idLevel])
            setName([...name, type])
        }
        else {
            setLevel(level.slice(0,-1));
            setName(name.slice(0,-1));
        }
        if (id && idLevel === 2) {
            getArtistAction(id);
        }
        if (id && idLevel === 3) {
            getAlbumTracksAction(id);
            setImg(defaultImg)
        }
    }
    const renderName = () => {
        let titleName = null;
        let data = null;
        switch (name[name.length - 1]) {
            case 'all-artist':
                titleName = 'Xem tất cả nghệ sĩ'
                data = artists.items.slice(0, 10);
                break;
            case 'all-album':
                titleName = 'Xem tất cả album'
                data = albums.items.slice(0, 10);
                break;
            case 'all-track':
                titleName = 'Xem tất cả bài hát'
                data = tracks.items.slice(0, 10);
                break;
            case 'artist':
                titleName = artistInfo.name;
                data = [];
                break;
            default:
                break;
        }
        return {
            title: titleName,
            data: data
        }
    }
    const renderContent = () => {
        let xhtml = null;
        switch (level[level.length - 1]) {
            case 0:
                xhtml = <CollectionSearchList data={sortResult.slice(0, 10)} setLevelData={setLevelData} level={level[level.length - 1]} addItem={addItemToPlaylistAction} idPlaylist={idPlaylist}/>
                break;
            case 1:
                xhtml = (<>
                    <div className="collection-search--title" onClick={() => setLevelData('back', null, null)}>
                        <i className="fas fa-chevron-left"></i>
                        <h3>{renderName().title}</h3>
                    </div>
                    <CollectionSearchList data={renderName().data} setLevelData={setLevelData} addItem={addItemToPlaylistAction} idPlaylist={idPlaylist}/>
                </>)
                break;
            case 2:
                xhtml = (<>
                    <div className="collection-search--title" onClick={() => setLevelData('back', null, null, null)}>
                        <i className="fas fa-chevron-left"></i>
                        <h3>{renderName().title}</h3>
                    </div>
                    <h3>Track</h3>
                    <CollectionSearchList data={topTracks} setLevelData={setLevelData} addItem={addItemToPlaylistAction} idPlaylist={idPlaylist}/>
                    <h3>Album</h3>
                    <CollectionSearchList data={topAlbums.items.slice(0, 10)} setLevelData={setLevelData} addItem={addItemToPlaylistAction} idPlaylist={idPlaylist}/>
                </>)
                break;
            case 3:
                xhtml = (
                    <>
                        <div className="collection-search--title" onClick={() => setLevelData('back', null, null)}>
                            <i className="fas fa-chevron-left"></i>
                            <h3>test</h3>
                        </div>
                        <CollectionSearchList data={albumtracks.items} setLevelData={setLevelData} defaultimg={defaultimg} addItem={addItemToPlaylistAction} idPlaylist={idPlaylist}/>
                    </>
                )
                break;
            default:
                break;
        }
        return xhtml;
    }
    return (
        <div className="collection-search">
            <div className="collection-search--top">
                <h2>Hãy cùng tìm nội dung cho danh sách phát của bạn</h2>
                <CollectionSearchBar type="collection-search" />
            </div>
            <div className="collection-search--result">
                {renderContent()}
            </div>
        </div>
    );
}
const mapDispatchToProps = (dispatch) => {
    return {
        getArtistAction: bindActionCreators(getArtist, dispatch),
        getAlbumTracksAction: bindActionCreators(getAlbumTracks, dispatch),
        addItemToPlaylistAction: bindActionCreators(addItemToPlaylist, dispatch),
    }
}
const mapStateToProps = (state) => {
    return {
        sortResult: state.search.sortResult,
        searchResult: state.search.result,
        topTracks: state.artist.topTracks,
        topAlbums: state.artist.albums,
        artistInfo: state.artist.artistInfo,
        albumtracks: state.artist.albumtracks
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CollectionSearch);