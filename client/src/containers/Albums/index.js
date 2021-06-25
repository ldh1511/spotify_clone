import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './styles.css';
import { connect } from 'react-redux';
import CardList from '../../components/CardList';
Albums.propTypes = {
    albums: PropTypes.object
};
Albums.defaultProps = {
    albums: {
        items: []
    }
}
function Albums(props) {
    const [list, setList]=useState(false);
    const { albums, name } = props;
    const { items } = albums;
    const renderCardListTable = () => {
        let xhtml = null;
        xhtml = <CardList data={items} />
        return xhtml;
    }
    const renderCardList=()=>{
        let xhtml = null;
        xhtml=<h1>this is list</h1>
        return xhtml;
    }
    return (
        <div className="albums">
            <div className="albums-filter">
                <h2>{name}</h2>
                <div className="filter-block">
                    <i className="fas fa-list-ul" onClick={()=>{setList(true)}}></i>
                    <i className="fas fa-border-all" onClick={()=>{setList(false)}}></i>
                </div>
            </div>
            {list===true ? renderCardList(): renderCardListTable()}
        </div>
    );
}
const mapStateToProps = (state) => {
    return {
        albums: state.artist.albums,
        name: state.artist.artistInfo.name
    }
}
const mapDispatchToProps = null;
export default connect(mapStateToProps, mapDispatchToProps)(Albums);