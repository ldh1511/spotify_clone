import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './styles.css';
import { getArtist } from '../../redux/actions/info';
import PlaylistTable from '../../components/PlaylistTable';
import CardBlock from '../../components/CardBlock';
import Banner from '../../components/Banner';
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Test from '../../components/test';
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
    related: { artists: [] },
}
function Artist(props) {
    const { location, getArtistAction, artist, topTracks, albums, related } = props;
    let { path, url } = useRouteMatch();
    let pathname = location.pathname.split('/');
    let match = pathname[pathname.length - 1];
    useEffect(() => {
        getArtistAction(match);
    }, [match])
    const renderPlaylists = () => {
        let xhtml = null;
        xhtml = (
            <>
                <h2>famous</h2>
                <PlaylistTable data={topTracks} name="tracks" type='track' />
            </>
        )
        return xhtml;
    }
    const renderAlbums = () => {
        let xhtml = null;
        let data = albums.items.filter((item, i) => i < 5);
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
        return xhtml;
    }
    const renderRelated = () => {
        let xhtml = null;
        let data = related.artists.filter((item, i) => i < 5);
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
        return xhtml;
    }
    return (
        <div className="artists">
            <Banner
                name={artist.name}
                image={artist.images[0].url}
                type="artist"
            />
            {renderPlaylists()}
            {renderAlbums()}
            {renderRelated()}
           

        </div>
    );
}
const mapStateToProps = state => {
    return {
        artist: state.artist.artistInfo,
        topTracks: state.artist.topTracks,
        albums: state.artist.albums,
        related: state.artist.related
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        getArtistAction: bindActionCreators(getArtist, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Artist);