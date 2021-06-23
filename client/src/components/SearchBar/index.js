import React from 'react';
import PropTypes from 'prop-types';
import './styles.css'
import { Search } from '../../redux/actions/info';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
SearchBar.propTypes = {

};

function SearchBar(props) {
    const { searchAction } = props;
    const handleOnChange = (e) => {
        const { value } = e.target;
       // if (value != '') {
            searchAction(value.substring().toLowerCase())
        //}
    }
    return (
        <div className="search-bar">
            <i className="fas fa-search"></i>
            <input
                type="text"
                className="form-control"
                name="search-bar"
                placeholder="Artist, Song or Podcast"
                onChange={(e) => handleOnChange(e)}
            />
            <i className="fas fa-times"></i>
        </div>
    );
}
const mapStateToProps = null;
const mapDispatchToProps = (dispatch) => {
    return {
        searchAction: bindActionCreators(Search, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);