import './App.css';
import Login from './containers/Login';
import Dashboard from './components/Dashboard';
import GLobalLoading from './components/GlobalLoading';
import React, { useEffect } from 'react';
import { getUserInfo } from './redux/actions/info';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { login } from './redux/actions/ui';
import refreshToken from './helper/refreshToken';
function App(props) {
  const { getUserInfoAction, loginToken, info } = props;
  useEffect(() => {
    if (loginToken) {
      getUserInfoAction()
    }
  }, [loginToken, getUserInfoAction]);
  useEffect(() => {
    if(info.statusCode && info.statusCode===401){
      refreshToken([getUserInfoAction]);
    }
  },[info,getUserInfoAction])
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
    state: state
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getUserInfoAction: bindActionCreators(getUserInfo, dispatch),
    loginAction: bindActionCreators(login, dispatch),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
