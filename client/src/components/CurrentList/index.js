import React from 'react';
import CurrentItem from '../CurrentItem';
import PropTypes from 'prop-types';
CurrentList.propTypes = {
    data: PropTypes.array,
}
CurrentList.defaultProps = {
    data: []
};

function CurrentList(props) {
    const { data } = props;
    const renderCurrentItem = () => {
        let xhtml = null;
        xhtml = data.map(item => (
           
            <CurrentItem
                key={item.description}
                name={item.name}
                images={item.images[0]}
                id={item.id}
            />)
        )
        return xhtml
    }
    return (
        <div className="current-list">
            {renderCurrentItem()}
        </div>
    );
}

export default CurrentList;