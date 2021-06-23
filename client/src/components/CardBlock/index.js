import React from 'react';
import './styles.css';
import CardList from '../CardList';
import PlaylistTable from '../../components/PlaylistTable';
import { NavLink } from 'react-router-dom';
CardBlock.defaultProps = {
    type: '',
    data:[]
}
function CardBlock(props) {
    const { name, data, id, param, type } = props;
    const renderCardList = () => {
        let xhtml = null;
        if (type !== 'track') {
            xhtml = <CardList data={data} type={type} />
        }
        else{
            xhtml=<PlaylistTable data={data} name="tracks" param={param} type='track'/>
        }
        return xhtml;
    }
    return (
        <div className="card-block">
            <div className="card-block-top">
                <div className="card-block-top-left">
                    <h3>{name}</h3>
                </div>
                <div className="card-block-top-right">
                    <NavLink to={param ? `/search-result/${param}/${name}` : `/gene/${id}`}>Xem tất cả</NavLink>
                </div>
            </div>
            {renderCardList()}
        </div>
    );
}

export default CardBlock;