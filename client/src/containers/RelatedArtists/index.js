import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';
import CardList from '../../components/CardList';
import { connect } from 'react-redux';
RelatedArtists.propTypes = {
    artistRelated: PropTypes.array
};
RelatedArtists.defaultProps = {
    artistRelated: []
}
function RelatedArtists(props) {
    const { artistRelated } = props;
    console.log(artistRelated);
    const renderCardList = () => {
        let xhtml = null;
        xhtml = <CardList data={artistRelated} type='artist' />
        return xhtml;
    }
    return (
        <div className="related-artists">
            <h3>related artists</h3>
            {renderCardList()}
        </div>
    );
}
const mapStateToProps = (state, ownProps) => {
    return {
        artistRelated: state.artist.related.artists
    }
}
const mapDispatchToProps = null;
export default connect(mapStateToProps, mapDispatchToProps)(RelatedArtists);