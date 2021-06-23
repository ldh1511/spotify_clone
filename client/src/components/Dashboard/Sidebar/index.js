import React from 'react';
import './styles.css';
import logo from '../../../assets/images/logo_spotify.jpg';
import {PropTypes, defaultProps} from 'prop-types';
import { NavLink } from 'react-router-dom';
Sidebar.defaultProps={
    items:[]
}
function Sidebar(props) {
    const {items}=props;
    const renderSidebarPlaylist=()=>{
        let xhtml=null;
        xhtml=items.map(item=><li key={item.id}><a href="true">{item.name}</a></li>)
        return xhtml
    }
    return (
        <div className="sidebar">
            <img src={logo} alt=""></img>
            <ul className="sidebar-list top">
                <li><NavLink activeClassName="li-active" to="/">Home</NavLink></li>
                <li><NavLink activeClassName="li-active" to="/search">Search</NavLink></li>
                <li><a href="true">Your library</a></li>
            </ul>
            <ul className="sidebar-list mid">
                <li><a href="true">Create Playlist</a></li>
                <li><a href="true">Liked Songs</a></li>
            </ul>
            <ul className="sidebar-list bot">
                <li><a href="true">Your top songs 2020</a></li>
                {renderSidebarPlaylist()}
            </ul>
        </div>
    );
}

export default Sidebar;