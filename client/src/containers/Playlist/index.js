import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Banner from '../../components/Banner';
import TrackTable from '../../components/TrackTable';
import { getTracksPlaylist } from '../../redux/actions/info';
import './styles.css';
import PropTypes from 'prop-types';

Playlist.propTypes = {
    tracksInPlaylist: PropTypes.array,
    getTracksInPlaylist: PropTypes.func,
    playlistInfo: PropTypes.object,
    location: PropTypes.string
};
Playlist.defaultProps = {
    tracksInPlaylist:[],
    playlistInfo:{
        images:[{url:''}],
        owner:{display_name:''}
    },
}
function Playlist(props) {
    const {getTracksInPlaylist, location, tracksInPlaylist, playlistInfo}=props;
    let pathname=location.pathname.split('/');
    let match=pathname[pathname.length-1];
    useEffect(()=>{
        getTracksInPlaylist(match)
    },[])
    return (
        <div className="playlist">
            <Banner 
                name={playlistInfo.name}
                image={playlistInfo.images[0].url}
                description={playlistInfo.description}
               owner={playlistInfo.owner.display_name}
                type={playlistInfo.type}
            />
            <div className="playlist-detail">
                <div className="playlist-btn">
                    <button className="play-btn btn-active"><i className="fas fa-play"></i></button>
                </div>
                <TrackTable data={tracksInPlaylist}/>
            </div>
        </div>
    );
}
const  mapStateToProps = state => {
    return {
        tracksInPlaylist:state.tracks.tracksInPlaylist,
        playlistInfo:state.tracks.playlistInfo,
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getTracksInPlaylist:bindActionCreators(getTracksPlaylist,dispatch)
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Playlist);