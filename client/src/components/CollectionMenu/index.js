import React from 'react';
import './styles.css';
import { NavLink } from 'react-router-dom';
function CollectionMenu(props) {
    return (
        <ul className="collection-menu">
            <li>
                <NavLink activeClassName="collection-active" to='/collection/playlists'>Playlist</NavLink>
            </li>
            <li>
                <NavLink activeClassName="collection-active" to='/collection/podcasts'>Podcast</NavLink>
            </li>
            <li>
                <NavLink activeClassName="collection-active" to='/collection/artists'>Nghệ sĩ</NavLink>
            </li>
            <li>
                <NavLink activeClassName="collection-active" to='/collection/albums'>Album</NavLink>
            </li>
        </ul>
    );
}

export default CollectionMenu;