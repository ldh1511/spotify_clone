import React from 'react';
import './styles.css';

import CardItem from '../CardItem';
function CardList(props) {
    const { data } = props;
    const renderCardItem = () => {
        let xhtml = null;
        xhtml = data.map(item => (
            <CardItem
                key={item.id}
                name={item.name}
                image={item.images[0].url}
                description={item.description}
                id={item.id}
            />
        ))
        return xhtml;
    }
    return (
        <div className="card-list">
            {renderCardItem()}
        </div>
    );
}

export default CardList;