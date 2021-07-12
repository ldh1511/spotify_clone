import React from 'react';
import './styles.css'
import { Search } from '../../redux/actions/info';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

function CollectionSearchBar(props) {
    const { searchAction, type, param } = props;
    const handleOnChange = (e) => {
        const { value } = e.target;
            searchAction(value.substring().toLowerCase())
    }
    return (
        <div className={type==="default-search"?"search-bar":"search-bar--collection"}>
            <i className="fas fa-search"></i>
            <input
                type="text"
                className="form-control"
                name="search-bar"
                value={param}
                placeholder={
                    type==="default-search"?"Artist, Song or Podcast":"Tìm bài hát và tập podcast"
                }
                onChange={(e) => handleOnChange(e)}
            />
            <i className="fas fa-times"></i>
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
export default connect(mapStateToProps, mapDispatchToProps)(CollectionSearchBar);