import React from 'react';
import { NavLink } from 'react-router-dom';
import './styles.css';
CardItem.defaultProps = {
    name: '',
    image: '',
    description: '',
    type:''
}
function CardItem(props) {
    const { name, image, description, id, type } = props;
    const limitdescription = (data) => {
        if (data) {
            let newstring = data.split(' ').slice(0, 7).join(' ')
            newstring += '...'
            return newstring
        }
    }
    return (
        <div className="card-item">
            <NavLink to={`/${type}/${id}`}>
                <div
                    className="card-item-top"
                    style={type === 'artist' ? { borderRadius: '50%' } : { borderRadius: '4px' }}
                >
                    <img alt="" src={image} ></img>
                    {/* <span>Hip hop</span> */}
                </div>
                <div className="card-item-bot">
                    <h4>{name}</h4>
                    <p>{limitdescription(description)}</p>
                </div>
                <button className="play-btn"><i className="fas fa-play"></i></button>
            </NavLink>
        </div>
    );
}

export default CardItem;