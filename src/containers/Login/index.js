import React, { useEffect } from 'react';
import { getTokenFromUrl, loginUrl } from "../../spotify";
import logo from '../../assets/images/logo_spotify.jpg';
import './styles.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { login } from '../../redux/actions/ui';
import { getToken } from '../../apis/info';
function Login(props) {
    const { loginAction } = props;
    // const runLogoutTimer = (timer) => {
    //     setTimeout(() => {
    //         localStorage.removeItem('token');
    //         loginAction("");
    //     }, timer)
    // }
    useEffect(() => {
        const curToken = localStorage.getItem('token');
        if (!curToken) {
            const code = getTokenFromUrl();
            const setTokenActions = async () => {
                let res = await getToken(code);
                localStorage.setItem('token', res.data.access_token);
                localStorage.setItem('refresh_token', res.data.refresh_token);
                loginAction(res.data.access_token);
                window.history.pushState({}, null, "/");
            }
            setTokenActions();
        }
        else {
            loginAction(curToken);
        }
    }, [loginAction])
    return (
        <div className="login-container">
            <img alt="" src={logo} />
            <a className="btn" href={loginUrl}>
                Login with Spotify
            </a>
            <p>LDH 2021</p>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        loginToken: state.login.loginToken,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        loginAction: bindActionCreators(login, dispatch),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);