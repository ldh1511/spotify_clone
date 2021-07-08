import React from 'react';
//import PropTypes from 'prop-types';
import './styles.css';
// Footer.propTypes = {

// };

function Footer(props) {
    return (
        <div className="footer">
            <div className="footer-left">
                <img alt="" src="https://i.scdn.co/image/ab67706f000000036c43bde56c400a5603a9b8e9" />
                <div className="footer-left--content">
                    <h4>Mascara</h4>
                    <span>Chillies</span>
                </div>
                <div className="footer-left--icon">
                    <i className="far fa-heart"></i>
                </div>
            </div>
            <div className="footer-center">
                <div className="footer-center--top">
                    <i className="far fa-heart"></i>
                    <i className="fas fa-step-backward"></i>
                    <div className="icon-play">
                        <i className="fas fa-play"></i>
                    </div>
                    <i className="fas fa-step-forward"></i>
                    <i className="fas fa-sync-alt"></i>
                </div>
                <div className="footer-center--bottom">
                    <span>0:00</span>
                    <div className="track-time"></div>
                    <span>4:53</span>
                </div>

            </div>
            <div className="footer-right">
                <div className="volum-box">
                    <i className="fas fa-volume-up"></i>
                    <div className="volumn">
                        test
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;