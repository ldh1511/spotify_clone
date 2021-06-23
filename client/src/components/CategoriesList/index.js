import React from 'react';
import PropTypes from 'prop-types';
import CategoriesItem from '../CategoriesItem';

CategoriesList.propTypes = {
    data: PropTypes.array
};
CategoriesList.defaultProps = {
    data: []
}

function CategoriesList(props) {
    const { data } = props;
    const getRandomColor=()=>{
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }
    const renderCategoriesItem = () => {
        let xhtml = null;
        xhtml = data.map(item => (
            <CategoriesItem
            key={item.id}
            name={item.name}
            icons={item.icons[0].url}
            color={getRandomColor()}
            id={item.id}
            />
        ))
        return xhtml
    }
    return (
        <div className="categories">
            {renderCategoriesItem()}
        </div>
    );
}

export default CategoriesList;