import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';
import CardItem from '../CardItem';
CardItem.propTypes = {
    data: PropTypes.array,
    type: PropTypes.string,
}
CardItem.defaultProps = {
    data: [],
    type:''
}
function CardList(props) {
    const { data, type } = props;
    console.log('albums',data)
    const renderCardItem = () => {
        let xhtml = null;
        xhtml = data.map((item,i) => {
            if (item.images.length !== 0 ) {
                return (
                    < CardItem
                        key={item.id}
                        name={item.name}
                        image={item.images[0].url}
                        description={item.description}
                        id={item.id}
                        type={type}
                    />
                )
            }
        })
        return xhtml;
    }
    return (
        <div className="card-list">
            {renderCardItem()}
        </div>
    );
}

export default CardList;