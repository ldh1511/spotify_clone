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
    const { name, data, id, param, type, match, path, own } = props;
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
    const renderPathname=()=>{
        if(param){
            return `/search-result/${param}/${name}`;
        }
        else if(match && path && own){
            return `/${own}/${match}/${path}`;
        }
        else{
            return `/gene/${id}`;
        }
    }
    return (
        <div className="card-block">
            <div className="card-block-top">
                <div className="card-block-top-left">
                    <h3>{name}</h3>
                </div>
                <div className="card-block-top-right">
                    <NavLink to={renderPathname()}>Xem tất cả</NavLink>
                </div>
            </div>
            {renderCardList()}
        </div>
    );
}

export default CardBlock;