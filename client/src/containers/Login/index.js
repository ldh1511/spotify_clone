import React from 'react';
import { loginUrl } from "../../spotify";
import logo from '../../assets/images/logo_spotify.jpg';
import './styles.css';
function Login(props) {
    return (
        <div className="login-container">
            <img alt="" src={logo}/>
            <a className="btn" href={loginUrl}>
                Login with Spotify
            </a>
        </div>
    );
}

export default Login;