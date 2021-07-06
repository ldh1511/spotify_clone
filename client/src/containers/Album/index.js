import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './styles.css';
import { bindActionCreators } from 'redux';
import { getAlbum, getArtistAlbum, GetSavedTracks } from '../../redux/actions/info';
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
    }
}
function Album(props) {
    const { location, getAlbumAction, albumInfo, getArtistAlbumAction, relatedAlbum, getSavedTracksAction, savedTracks } = props;
    const { images, name, tracks, type, artists, release_date, id } = albumInfo;
    let pathname = location.pathname.split('/');
    let match = pathname[pathname.length - 1];
    useEffect(() => {
        getAlbumAction(match);
        getSavedTracksAction();
    }, [match])
    useEffect(() => {
        if (artists[0].id !== '') {
            getArtistAlbumAction(artists[0].id);
        }
    }, [artists])
    const getNameArtist = (arr) => {
        let artist_name = '';
        if (arr.length > 1) {
            arr.map(item => {
                artist_name += `${item.name} `
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
        newItems=newItems.slice(0,5);
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
    return (
        <div className="album">
            <Banner
                name={name}
                image={images[0].url}
                description={release_date.split('-')[0]}
                owner={getNameArtist(artists)}
                type={type}
            />
            <TrackTable data={tracks.items} note='album-track' savedTracks={savedTracks}/>
            {renderCardBlock()}
        </div>
    );
}
const mapStateToProps = (state) => {
    return {
        albumInfo: state.album.albumInfo,
        relatedAlbum: state.album.relatedAlbum,
        savedTracks: state.tracks.savedTracks,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getAlbumAction: bindActionCreators(getAlbum, dispatch),
        getArtistAlbumAction: bindActionCreators(getArtistAlbum, dispatch),
        getSavedTracksAction: bindActionCreators(GetSavedTracks, dispatch),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Album);