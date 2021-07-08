import React from 'react';
import './styles.css';
import { PropTypes } from 'prop-types';
import { useHistory } from "react-router-dom";
Header.propsTypes = {
  info: PropTypes.array,
}
Header.defaultProps = {
  images: [{ url: '' }],
  name: ''
}
function Header(props) {
  const { images, name, logoutAction } = props;
  const history = useHistory();
  const handleLogout=()=>{
    logoutAction();
  }
  return (
    <nav>
      <div className="navbar-left">
        <button onClick={() => history.goBack()}><i className="fas fa-chevron-left"></i></button>
        <button><i className="fas fa-chevron-right"></i></button>
      </div>
      <div className="account">
        <img src={images[0].url} alt=""></img>
        <h3>{name}</h3>
        <div className="dropdown-list">
          <ul>
            <li>Tài khoản</li>
            <li>Hồ sơ</li>
            <li onClick={()=>handleLogout()}>Đăng xuất</li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;