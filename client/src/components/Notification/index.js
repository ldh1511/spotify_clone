import React, { useEffect } from 'react';
import './styles.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
Notification.defaultProps={
    noti:''
}
Notification.propTypes = {
    noti:PropTypes.string
};

function Notification(props) {
    const {noti}=props;
    return (
        <div className={noti!==''? "notification active":"notification"} >
            <p>{noti}</p>
        </div>
    );
}
const mapStateToProps = (state, ownProps) => {
    return {
        noti: state.notification
    }
}
export default connect(mapStateToProps)(Notification);