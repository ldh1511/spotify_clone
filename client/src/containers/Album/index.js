import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './styles.css';
import { bindActionCreators } from 'redux';
import { getAlbum, getArtistAlbum, GetSavedTracks, getPredominantColor, SaveTracks, RemoveFromTracks, GetSavedALbums, saveAlbums, removeAlbums, getPreviewUrl } from '../../redux/actions/info';
import { connect } from 'react-redux';
import Banner from '../../components/Banner';
import TrackTable from '../../components/TrackTable';
import CardBlock from '../../components/CardBlock';
Album.propTypes = {
    getAlbumAction: PropTypes.func,
    albumInfo: PropTypes.object,
};
Album.defaultProps = {
    albumInfo: {
        images: [{ url: '' }],
        tracks: {
            items: []
        },
        release_date: '',
        artists: [{ name: '', id: '' }],
        id: ''
    },
    relatedAlbum: {
        items: []
    },
    savedAlbums:{
        items:[]
    }
}
function Album(props) {
    const { location,
        getAlbumAction,savedAlbums,
        albumInfo, getArtistAlbumAction,
        relatedAlbum, getSavedTracksAction,
        savedTracks, getPredominantColorAction,
        predominantColor,getSavedAlbumsAction,
        SaveTracksAction, removeFromTracksAction,
        saveAlbumsAction, removeAlbumsAction,
        getPreviewUrlAction } = props;
    const { images, name, tracks, type, artists, release_date, id } = albumInfo;
    const {items}=savedAlbums;
    const [check, setCheck]=useState(false);
    let pathname = location.pathname.split('/');
    let match = pathname[pathname.length - 1];
    useEffect(() => {
        getAlbumAction(match);
        getSavedTracksAction();
        getSavedAlbumsAction();
    }, [match, getSavedTracksAction, getAlbumAction,getSavedAlbumsAction])
    useEffect(() => {
        if (artists[0].id !== '') {
            getArtistAlbumAction(artists[0].id);
        }
    }, [artists, getArtistAlbumAction])
    useEffect(() => {
        if(id){
            let checked= items.filter((item)=>item.album.id===id);
            if(checked.length===1){
                setCheck(true);
            }
            else{
                setCheck(false);
            }
        }

    },[albumInfo,items, id])
    const getNameArtist = (arr) => {
        let artist_name = '';
        if (arr.length > 1) {
            arr.map(item => {
                artist_name += `${item.name} `
                return true;
            })
        }
        else {
            artist_name = arr[0].name;
        }
        return artist_name;
    }
    const renderCardBlock = () => {
        const { items } = relatedAlbum;
        let newItems = items.filter((item, i) => (item.id !== id));
        newItems = newItems.slice(0, 5);
        let xhtml = null;
        xhtml = (
            <CardBlock
                data={newItems}
                type='album'
                name='related album'
                own='album'
                path='related-albums'
                match={match}
            />)
        return xhtml;
    }
    const handleSaveAlbums=()=>{
        if(check===true){
            removeAlbumsAction(id);
        }
        else{
            saveAlbumsAction(id, albumInfo);
        }
    }
    const handlePlayAudio = ()=>{
        let newTracks=tracks;
        newTracks.items.map(item=>{
            item.images=images
            return true;
        })
        getPreviewUrlAction(newTracks.items[0],newTracks.items);
    }
    return (
        <div className="album">
            <Banner
                name={name}
                image={images[0].url}
                description={release_date.split('-')[0]}
                owner={getNameArtist(artists)}
                type={type}
                getPredominantColor={getPredominantColorAction}
                predominantColor={predominantColor}
            />
            <div className="mid-content" style={{ backgroundColor: `${predominantColor}` }}>
                <button className="play-btn" onClick={() =>handlePlayAudio()}>
                    <i className="fas fa-play"></i>
                </button>
                <i
                    className={check===true?`fas fa-heart item-icon active`:`far fa-heart item-icon`}
                    onClick={() =>handleSaveAlbums()}
                ></i>
            </div>
            <TrackTable
                data={tracks.items}
                note='album-track'
                savedTracks={savedTracks}
                SaveTracksAction={SaveTracksAction}
                removeFromTrack={removeFromTracksAction}
            />
            {renderCardBlock()}
        </div>
    );
}
const mapStateToProps = (state) => {
    return {
        albumInfo: state.album.albumInfo,
        relatedAlbum: state.album.relatedAlbum,
        savedTracks: state.tracks.savedTracks,
        predominantColor: state.ui.predominantColor,
        savedAlbums:state.album.savedAlbums
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getAlbumAction: bindActionCreators(getAlbum, dispatch),
        getArtistAlbumAction: bindActionCreators(getArtistAlbum, dispatch),
        getSavedTracksAction: bindActionCreators(GetSavedTracks, dispatch),
        getPredominantColorAction: bindActionCreators(getPredominantColor, dispatch),
        SaveTracksAction: bindActionCreators(SaveTracks, dispatch),
        removeFromTracksAction: bindActionCreators(RemoveFromTracks, dispatch),
        getSavedAlbumsAction: bindActionCreators(GetSavedALbums, dispatch),
        saveAlbumsAction: bindActionCreators(saveAlbums, dispatch),
        removeAlbumsAction: bindActionCreators(removeAlbums, dispatch),
        getPreviewUrlAction: bindActionCreators(getPreviewUrl, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Album);