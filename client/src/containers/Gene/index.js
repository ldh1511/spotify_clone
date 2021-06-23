import React, { useEffect } from 'react';
import { getCategory } from '../../redux/actions/info';
import CardList from'./../../components/CardList';
import PropTypes from 'prop-types';
import './styles.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
Gene.propTypes = {
    categoryInfo: PropTypes.object,
    categoryPlaylist: PropTypes.array,
};
Gene.defaultProps = {
    categoryInfo: {
        name: ""
    },
    categoryPlaylist: []
}
function Gene(props) {
    const { location, getCategoryAction, categoryInfo, categoryPlaylist } = props;
    let pathname = location.pathname.split('/');
    let match = pathname[pathname.length - 1];
    useEffect(() => {
        getCategoryAction(match);
    }, [])
    const renderCardList=()=>{
        let xhtml=null;
        xhtml=<CardList data={categoryPlaylist}/>
        return xhtml;
    }
    return (
        <div className="gene">
            <div className="card-block">
                <div className="card-block-top">
                    <div className="card-block-top-left">
                        <h3>{categoryInfo.name}</h3>
                    </div>
                </div>
                {renderCardList()}
            </div>
        </div>
    );
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getCategoryAction: bindActionCreators(getCategory, dispatch)
    }
}
const mapStateToProps = state => {
    return {
        categoryInfo: state.categories.categoryInfo,
        categoryPlaylist: state.categories.categoryPlaylist,
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Gene);