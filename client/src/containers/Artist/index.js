import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './styles.css';
import { FollowArtist, getArtist, getArtistFollowed, GetSavedTracks, UnFollowArtist } from '../../redux/actions/info';
import TrackTable from '../../components/TrackTable';
import CardBlock from '../../components/CardBlock';
import Banner from '../../components/Banner';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
Artist.propTypes = {
    artist: PropTypes.object,
    album: PropTypes.object,
    topTracks: PropTypes.array,
};
Artist.defaultProps = {
    artist: {
        name: '',
        images: [{ url: '' }],
    },
    topTracks: [],
    albums: { items: [] },
    savedTracks: { items: [] },
    related: { artists: [] },
    singles: [],
    followedArtists: { items: [] }
}
function Artist(props) {
    const {
        location,
        getArtistAction,
        artist,
        topTracks,
        albums,
        related,
        singles,
        followedArtists,
        FollowArtistAction,
        UnFollowArtistAction,
        getArtistFollowedAction,
        savedTracks, getSavedTracksAction  } = props;
    const { items } = followedArtists, { id } = artist;
    let pathname = location.pathname.split('/');
    let match = pathname[pathname.length - 1];
    useEffect(() => {
        getArtistAction(match);
        getArtistFollowedAction();
        getSavedTracksAction();
    }, [match])
    const renderPlaylists = () => {
        let xhtml = null;
        if(topTracks.length>0){
            xhtml = (
                <>
                    <h2>famous</h2>
                    <TrackTable data={topTracks} name="tracks" type='track' savedTracks={savedTracks}/>
                </>
            )
        }
        
        return xhtml;
    }
    const checkFollow = () => {
        let check = null, result = false;
        check = items.filter(item => item.id === id);
        if (check.length > 0) {
            result = true;
        }
        return result;
    }
    const renderAlbums = () => {
        let xhtml = null;
        let data = albums.items.filter((item, i) => (item.album_type === 'album'));
        data = data.slice(0, 5);
        if(data.length>0){
            xhtml = (
                <CardBlock
                    name="albums"
                    type="album"
                    data={data}
                    match={match}
                    path='albums'
                    own='artist'
                />
            )
        }
        return xhtml;
    }
    const renderSingle = () => {
        let xhtml = null;
        let data = singles.filter((item, i) => (item.album_type === 'single'));
        data = data.slice(0, 5);
        if(data.length>0){
            xhtml = (
                <CardBlock
                    name="singles"
                    type="album"
                    data={data}
                    match={match}
                    path='singles'
                    own='artist'
    
                />
            )
        }
        
        return xhtml;
    }
    const renderRelated = () => {
        let xhtml = null;
        let data = related.artists.slice(0, 5);
        if(data.length>0){
            xhtml = (
                <CardBlock
                    name="related artists"
                    type='artist'
                    data={data}
                    match={match}
                    path='related-artists'
                    own='artist'
                />
            )
        }
        return xhtml;
    }
    return (
        <div className="artists">
            <Banner
                name={artist.name}
                image={
                    artist.images && artist.images[0] && artist.images[0].url ? 
                    artist.images[0].url :
                    ''
                }
                type="artist"
                followed={checkFollow()}
                id={id}
                follow={FollowArtistAction}
                unfollow={UnFollowArtistAction}
            />
            <div className="playlist-detail">
                {renderPlaylists()}
                {renderAlbums()}
                {renderSingle()}
                {renderRelated()}
            </div>
        </div>
    );
}
const mapStateToProps = state => {
    return {
        artist: state.artist.artistInfo,
        topTracks: state.artist.topTracks,
        albums: state.artist.albums,
        related: state.artist.related,
        singles: state.artist.singles,
        followedArtists: state.artist.followedArtists,
        savedTracks: state.tracks.savedTracks,
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        getArtistAction: bindActionCreators(getArtist, dispatch),
        FollowArtistAction: bindActionCreators(FollowArtist, dispatch),
        UnFollowArtistAction: bindActionCreators(UnFollowArtist, dispatch),
        getArtistFollowedAction: bindActionCreators(getArtistFollowed, dispatch),
        getSavedTracksAction: bindActionCreators(GetSavedTracks, dispatch),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Artist);