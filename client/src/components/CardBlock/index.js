import React from 'react';
import './styles.css';
import CardList from '../CardList';
import TrackTable from '../../components/TrackTable';
import { NavLink } from 'react-router-dom';
CardBlock.defaultProps = {
    type: '',
    data: []
}
function CardBlock(props) {
    const { name, data, id, param, type, match, path, own, savedTracks } = props;
    const renderCardList = () => {
        let xhtml = null;
        if (type !== 'track') {
            xhtml = <CardList data={data} type={type} />
        }
        else {
            xhtml = <TrackTable
                data={data} name="tracks" param={param} type='track' savedTracks={savedTracks}
            />
        }
        return xhtml;
    }
    const renderPathname = () => {
        let pathname = null;
        if (param) {
            pathname = `/search-result/${param}/${name}`;
        }
        else if (match && path && own) {
            pathname = `/${own}/${match}/${path}`;
        }
        else {
            pathname = `/gene/${id}`;
        }
        return pathname;
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