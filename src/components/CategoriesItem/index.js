import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
CategoriesItem.propTypes = {
    name: PropTypes.string,
    icons: PropTypes.string,
    color: PropTypes.string,
    id: PropTypes.string
};

function CategoriesItem(props) {
    const { name, icons, color, id } = props
    return (
        <NavLink to={`/gene/${id}`} className="category-item" style={{ backgroundColor: `${color}` }}>
            <img alt="" src={icons}></img>
            <h3>{name}</h3>
        </NavLink>
    );
}

export default CategoriesItem;