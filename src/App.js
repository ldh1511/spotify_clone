import './App.css';
import Login from './containers/Login';
import Dashboard from './components/Dashboard';
import GLobalLoading from './components/GlobalLoading';
import React, { useEffect } from 'react';
import { getTokenFromUrl } from './spotify';
import { getUserInfo, setToken } from './redux/actions/info';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getToken } from './apis/info';
import { login } from './redux/actions/ui';
function App(props) {
  const { getUserInfoAction, loginToken, loginAction, state } = props;
  const runLogoutTimer = (timer) => {
    setTimeout(() => {
      localStorage.removeItem('token');
      loginAction("");
    }, timer)
  }
  const curToken = localStorage.getItem('token');
  useEffect(() => {
    if (!curToken) {
      const code = getTokenFromUrl();
      const setTokenActions = async () => {
        if(code!==undefined) {
          let res = await getToken(code);
          localStorage.setItem('token', res.data.access_token);
          runLogoutTimer(res.data.expires_in * 1000);
          loginAction(res.data.access_token);
          window.history.pushState({}, null, "/");
        }
      }
      setTokenActions();
      getUserInfoAction();
    }
    else {
      loginAction(curToken);
      getUserInfoAction();
    }
  }, [loginToken, getUserInfoAction, curToken, loginAction,])
  return (
    <div className="App">
      {loginToken && loginToken !== null ?
        <>
          <GLobalLoading />
          <Dashboard />
        </>
        :
        <Login />
      }
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    loginToken: state.login.loginToken,
    info: state.info,
    state:state
  }
}
const mapDispatchToProps = dispatch => {
  return {
    setAccessTokenAction: bindActionCreators(setToken, dispatch),
    getUserInfoAction: bindActionCreators(getUserInfo, dispatch),
    loginAction: bindActionCreators(login, dispatch),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
