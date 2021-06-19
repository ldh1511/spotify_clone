import './App.css';
import Login from './containers/Login';
import Dashboard from './components/Dashboard';
import GLobalLoading from './components/GlobalLoading';
import { useEffect, useState } from 'react';
import { getTokenFromUrl } from './spotify';
import { BrowserRouter } from 'react-router-dom';
import SpotifyWebApi from 'spotify-web-api-js';
import { getUserInfo, setToken } from './redux/actions/info';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
const spotify = new SpotifyWebApi();
function App(props) {
  const { setTokenAction, getUserInfoAction } = props;
  const [token, setToken] = useState(null);
  useEffect(() => {
    const curToken = localStorage.getItem('token');
    const hash = getTokenFromUrl();
    window.location.hash = "";
    const _token = hash.access_token;
    if (curToken) {
      spotify.setAccessToken(curToken);
      setToken(curToken);
    }
    else {
      if (_token) {
        setToken(_token);
        setTokenAction(_token);
        spotify.setAccessToken(_token);
      }
    }
    getUserInfoAction();
  }, [])
  return (
    <div className="App">
      {token ? (
        <>
          <GLobalLoading />
          <Dashboard />
        </>
      ) : (<Login />)}
    </div>
  )
}
const mapStateToProps = null
const mapDispatchToProps = dispatch => {
  return {
    setTokenAction: bindActionCreators(setToken, dispatch),
    getUserInfoAction: bindActionCreators(getUserInfo, dispatch),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
