import React from 'react';
import { connect } from 'react-redux';
import img from './../../assets/images/content_loading.gif'
import './styles.css';
function ContentLoading(props) {
    const { showContentLoading } = props;
    if (showContentLoading) {
        return (
            <div className="content-loading">
                <img src={img} alt=""></img>
            </div>
        );
    }
    else {
        return null;
    }
}
const mapStateToProps = state => {
    return {
        showContentLoading: state.ui.showContentLoading
    }
}
export default connect(mapStateToProps)(ContentLoading);