import React from 'react';
import PropTypes from 'prop-types';
import './styles.css'
import { Search } from '../../redux/actions/info';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
SearchBar.propTypes = {
    searchAction: PropTypes.func,
};

function SearchBar(props) {
    const { searchAction, type,param } = props;
    const handleOnChange = (e) => {
        const { value } = e.target;
        searchAction(value.substring().toLowerCase());
    }
    const handleDeleteQuery=()=>{
        searchAction('');
    }
    return (
        <div className={type === "default-search" ? "search-bar" : "search-bar--collection"}>
            <i className="fas fa-search"></i>
            <input
                type="text"
                className="form-control"
                name="search-bar"
                value={param}
                placeholder={
                    type === "default-search" ? "Artist, Song or Podcast" : "Tìm bài hát và tập podcast"
                }
                onChange={(e) => handleOnChange(e)}
            />
            <i className="fas fa-times" onClick={handleDeleteQuery}></i>
        </div>
    );
}
const mapStateToProps = (state)=>{
    return{
        param:state.search.param
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        searchAction: bindActionCreators(Search, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);