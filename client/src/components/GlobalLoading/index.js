import React from 'react';
import { connect } from 'react-redux';
import logo from '../../assets/images/loadingfile.gif';
import './styles.css';
function GLobalLoading(props) {
    const { showLoading } = props;
    if (showLoading) {
        return (
            <div className="global-loading">
                <img alt="" src={logo}></img>
            </div>
        );
    }
    else{
        return null
    }
}
const mapStateToProps = state => {
    return {
        showLoading: state.ui.showLoading
    }
}
export default connect(mapStateToProps)(GLobalLoading);