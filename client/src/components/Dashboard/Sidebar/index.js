import React from 'react';
import './styles.css';
import logo from '../../../assets/images/logo_spotify.jpg';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
Sidebar.propTypes={
    items: PropTypes.array,
}
Sidebar.defaultProps = {
    items: []
}
function Sidebar(props) {
    const { items } = props;
    const renderSidebarPlaylist = () => {
        let xhtml = null;
        xhtml = items.map(item => (
        <li key={item.id}>
            <NavLink to={`/playlist/${item.id}`}>{item.name}</NavLink>
        </li>))
        return xhtml
    }
    return (
        <div className="sidebar">
             <NavLink to="/">
             <img src={logo} alt=""></img>
             </NavLink>
            <ul className="sidebar-list top">
                <li>
                    <NavLink activeClassName="li-active" to="/">
                        <svg viewBox="0 0 512 512" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M448 463.746h-149.333v-149.333h-85.334v149.333h-149.333v-315.428l192-111.746 192 110.984v316.19z" fillRule="current"></path>
                        </svg>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink activeClassName="li-active" to="/search">
                        <svg viewBox="0 0 512 512" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M357.079 341.334l94.476 110.73-32.508 27.683-94.222-110.476q-45.714 30.476-100.826 30.476-36.826 0-70.476-14.349t-57.905-38.603-38.603-57.905-14.349-70.476 14.349-70.476 38.603-57.905 57.905-38.603 70.476-14.349 70.476 14.349 57.905 38.603 38.603 57.905 14.349 70.476q0 23.365-5.841 45.714t-16.635 41.651-25.778 35.555zM224 357.079q28.19 0 53.841-11.048t44.19-29.587 29.587-44.19 11.048-53.841-11.048-53.841-29.587-44.191-44.19-29.587-53.841-11.047-53.841 11.047-44.191 29.588-29.587 44.19-11.047 53.841 11.047 53.841 29.588 44.19 44.19 29.587 53.841 11.048z" fillRule="current"></path>
                        </svg>
                        Search
                    </NavLink>
                </li>
                <li>
                    <NavLink activeClassName="li-active" to="/collection/playlists">
                        <svg viewBox="0 0 512 512" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M291.301 81.778l166.349 373.587-19.301 8.635-166.349-373.587zM64 463.746v-384h21.334v384h-21.334zM192 463.746v-384h21.334v384h-21.334z" fillRule="current"></path>
                        </svg>
                        Library
                    </NavLink>
                </li>
            </ul>
            <ul className="sidebar-list mid">
                <li>
                    <a href="true">
                        <svg role="img" height="12" width="12" viewBox="0 0 16 16" className="Svg-sc__sc-1bi12j5-0 hPiOwj">
                            <path d="M14 7H9V2H7v5H2v2h5v5h2V9h5z"></path>
                            <path fillRule="none" d="M0 0h16v16H0z"></path>
                        </svg>
                        Create Playlist
                    </a>
                </li>
                <li>
                    <NavLink activeClassName="li-active" to="/collection/tracks">
                        <div className="sidebar-icon">
                            <svg role="img" height="12" width="12" viewBox="0 0 16 16" className="Svg-sc__sc-1bi12j5-0 hPiOwj">
                                <path fill="none" d="M0 0h16v16H0z"></path><path d="M13.797 2.727a4.057 4.057 0 00-5.488-.253.558.558 0 01-.31.112.531.531 0 01-.311-.112 4.054 4.054 0 00-5.487.253c-.77.77-1.194 1.794-1.194 2.883s.424 2.113 1.168 2.855l4.462 5.223a1.791 1.791 0 002.726 0l4.435-5.195a4.052 4.052 0 001.195-2.883 4.057 4.057 0 00-1.196-2.883z"></path>
                            </svg>
                        </div>
                        Liked Songs
                    </NavLink>
                </li>
            </ul>
            <ul className="sidebar-list bot">
                {renderSidebarPlaylist()}
            </ul>
        </div>
    );
}

export default Sidebar;