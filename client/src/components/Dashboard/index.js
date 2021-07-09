import React, { useEffect } from "react";
import Home from '../../containers/Home';
import Header from '../Header';
import Sidebar from "./Sidebar";
import Footer from '../Footer';
import ContentLoading from '../ContentLoading';
import './styles.css'
import { Switch, Route } from "react-router-dom";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { getUserPlaylist } from "../../redux/actions/info";
import Playlist from "../../containers/Playlist";
import Gene from "../../containers/Gene";
import Search from "../../containers/Search";
import SearchResult from "../../containers/SearchResult";
import Artist from "../../containers/Artist";
import RelatedArtists from "../../containers/RelatedArtists";
import Albums from "../../containers/Albums";
import Album from "../../containers/Album";
import RelatedAlbums from "../../containers/RelatedAlbums";
import Collection from "../../containers/Collection";
import Podcast from "../../containers/Podcast";
import { logout } from "../../redux/actions/ui";
Dashboard.defaultProps = {
  info: ''
}
function Dashboard(props) {
  const { getUserPlaylistAction, info, playlist, logoutAction, predominantColor } = props;
  useEffect(() => {
    if (info.id) {
      getUserPlaylistAction(info.id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [info])
  return (
    <div className="dashboard">
      <Sidebar items={playlist.items} />
      <div className="dashboard-content">
        <ContentLoading />
        <Header 
        images={info.images} name={info.display_name} logoutAction={logoutAction}
        predominantColor={predominantColor}
        />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/playlist' component={Playlist} />
          <Route path='/podcast' component={Podcast} />
          <Route path='/gene' component={Gene} />
          <Route path='/search' component={Search} />
          <Route
            path='/album'
            render={({ match: { url } }) => (
              <>
                <Route path={`${url}/:id`} component={Album} exact />
                <Route path={`${url}/:id/related-albums`} component={RelatedAlbums} />
              </>
            )}
          />
          <Route path='/search-result' component={SearchResult} />
          <Route
            path='/artist'
            render={({ match: { url } }) => (
              <>
                <Route path={`${url}/:id`} component={Artist} exact />
                <Route path={`${url}/:id/related-artists`} component={RelatedArtists} />
                <Route path={`${url}/:id/albums`} component={Albums} />
                <Route path={`${url}/:id/singles`} component={Albums} />
              </>
            )}
          />
          <Route 
          path='/collection'
            render={({ match: { url } }) => (
              <>
                <Route path={`${url}/playlists`} component={Collection} exact />
                <Route path={`${url}/albums`} component={Collection} />
                <Route path={`${url}/podcasts`} component={Collection} />
                <Route path={`${url}/artists`} component={Collection} />
                <Route path={`${url}/tracks`} component={Playlist} />
              </>
            )}/>
        </Switch>
      </div>
      <Footer />
    </div>
  );
};
const mapStateToProps = state => {
  return {
    info: state.info,
    playlist: state.playlist,
    predominantColor:state.ui.predominantColor
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getUserPlaylistAction: bindActionCreators(getUserPlaylist, dispatch),
    logoutAction: bindActionCreators(logout, dispatch), 

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);