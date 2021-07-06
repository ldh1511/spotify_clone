import './App.css';
import Login from './containers/Login';
import Dashboard from './components/Dashboard';
import GLobalLoading from './components/GlobalLoading';
import { useEffect, useState } from 'react';
import { getTokenFromUrl } from './spotify';
import { BrowserRouter } from 'react-router-dom';
import SpotifyWebApi from 'spotify-web-api-js';
import {getUserInfo, setToken } from './redux/actions/info';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getToken } from './apis/info';
const spotify = new SpotifyWebApi();
function App(props) {
  const { setTokenAction, getUserInfoAction} = props;
  const [token, setToken] = useState(null);
  window.location.hash="";
  useEffect(() => {
    const curToken = localStorage.getItem('token');
    if (!curToken) {
      const hash = getTokenFromUrl();
      const code = hash;
      const setTokenActions = async () => {
        let res = await getToken(code);
        setTokenAction(res.data.access_token);
      }
      setTokenActions();
    }
    setToken(curToken);
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
