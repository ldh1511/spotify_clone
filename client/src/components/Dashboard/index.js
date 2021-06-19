import React, { useEffect } from "react";
import Home from '../../containers/Home';
import Header from '../Header';
import Sidebar from "./Sidebar";
import ContentLoading from '../ContentLoading';
import './styles.css'
import { Switch, Route } from "react-router-dom";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { getUserPlaylist } from "../../redux/actions/info";

import Playlist from "../../containers/Playlist";
import Gene from "../../containers/Gene";
Dashboard.defaultProps = {
  info:''
}
function Dashboard(props)  {
  const { getUserPlaylistAction, info, playlist } = props;
  useEffect(() => {
    if (info.id) {
      getUserPlaylistAction(info.id)
    }
  }, [info])
  return (
    <div className="dashboard">
      <Sidebar items={playlist.items} />
      <div className="dashboard-content">
        <ContentLoading/>
        <Header  images={info.images} name={info.display_name}/>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/playlist' component={Playlist}/>
          <Route path='/gene' component={Gene}/>
        </Switch>
      </div>
    </div>
  );
};
const mapStateToProps = state => {
  return {
    info: state.info,
    playlist: state.playlist
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getUserPlaylistAction: bindActionCreators(getUserPlaylist, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);