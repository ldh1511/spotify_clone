import React from 'react';
import './styles.css';
import CardList from '../CardList';
import {NavLink} from 'react-router-dom';
function CardBlock(props) {
    const {name, data, id}=props;
    //console.log(id);
    const renderCardList=()=>{
        let xhtml=null;
        xhtml=<CardList data={data}/>
        return xhtml;
    }
    return (
        <div className="card-block">
            <div className="card-block-top">
                <div className="card-block-top-left">
                    <h3>{name}</h3>
                </div>
                <div className="card-block-top-right">
                    <NavLink to={`/gene/${id}`}>Xem tất cả</NavLink>
                </div>
            </div>
            {renderCardList()}
        </div>
    );
}

export default CardBlock;