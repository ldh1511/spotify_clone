import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';
import { connect } from 'react-redux';
import CardList from '../../components/CardList';
RelatedAlbums.propTypes = {
    relatedAlbum:PropTypes.object,
};
RelatedAlbums.defaultProps = {
    relatedAlbum:{
        items:[]
    }
}
function RelatedAlbums(props) {
    const {relatedAlbum}=props;
    const {items}=relatedAlbum;
    const renderCardList = () => {
        let xhtml = null;
        let newItems=items.filter(item=>item.album_type==='album');
        xhtml=<CardList data={newItems} type='album'/>
        return xhtml;
    }
    return (
        <div className="related-album">
            <h3>related albums</h3>
            {renderCardList()}
        </div>
    );
}
const mapStateToProps = (state, ownProps) => {
    return {
        relatedAlbum: state.album.relatedAlbum
    }
}
export default connect(mapStateToProps)(RelatedAlbums);