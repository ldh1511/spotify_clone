import './App.css';
import Login from './containers/Login';
import Dashboard from './components/Dashboard';
import GLobalLoading from './components/GlobalLoading';
import { useEffect, useState } from 'react';
import { getTokenFromUrl } from './spotify';
import { getUserInfo, setToken } from './redux/actions/info';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getToken } from './apis/info';
import { login } from './redux/actions/ui';
function App(props) {
  const { getUserInfoAction, loginToken, loginAction } = props;
  // const [token, setToken] = useState(null);
  const curToken = localStorage.getItem('token');
  useEffect(() => {
    if (!curToken) {
      const code = getTokenFromUrl();
      const setTokenActions = async () => {
        let res = await getToken(code);
        // setAccessTokenAction(res.data.access_token);
        localStorage.setItem('token',res.data.access_token);
        loginAction(res.data.access_token);
        window.history.pushState({}, null, "/");
      }
      setTokenActions();
      getUserInfoAction();
    }
    else{
      loginAction(curToken);
      getUserInfoAction();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[loginToken] )
  return (
    <div className="App">
      {loginToken !== null ?
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
const mapStateToProps = (state)=>{
  return{
    loginToken:state.login.loginToken
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
