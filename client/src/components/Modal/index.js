import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './styles.css';
Modal.propTypes = {

};

function Modal(props) {
    const { check, closeModal, upload, id } = props;
    const [img, setImg]=useState();
    const handleSelectImg=(event)=>{
        setImg(event.target.files[0]);
    }
    const handleUploadImg=()=>{
        console.log(img);
        upload(id,img);
    }
    return (
        <div  className={check === true ? 'modal-container modal-active' : 'modal-container'}>
            <div className='modal'>
                <div className="modal-top">
                    <h2>Edit details</h2>
                    <i className="fas fa-times" onClick={() => closeModal()}></i>
                </div>
                <form className="modal-middle">
                    <div className="modal-image">
                        {/* <img alt=""></img> */}
                        <input type="file" onChange={(e)=>handleSelectImg(e)}/>
                        {/* <svg height="128" role="img" width="128" viewBox="-20 -25 100 100"
                            className="_0de6546a8c9a0ed2cc34a83aa2c4a47a-scss beabeff74fb6ea16fdd40b8a78d9aeda-scss" aria-hidden="true" data-testid="card-image-fallback"><path d="M16 7.494v28.362A8.986 8.986 0 0 0 9 32.5c-4.962 0-9 4.038-9 9s4.038 9 9 9 9-4.038 9-9V9.113l30-6.378v27.031a8.983 8.983 0 0 0-7-3.356c-4.962 0-9 4.038-9 9 0 4.963 4.038 9 9 9s9-4.037 9-9V.266L16 7.494zM9 48.5c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7c0 3.859-3.141 7-7 7zm32-6.09c-3.86 0-7-3.14-7-7 0-3.859 3.14-7 7-7s7 3.141 7 7c0 3.861-3.141 7-7 7z " fill="currentColor" fill-rule="evenodd"></path>
                        </svg> */}
                    </div>
                    <div className="modal-content">
                        <input type="text" name="" placeholder="" />
                        <textarea name="" rows="3"></textarea>
                    </div>
                </form>
                <div className="modal-bottom">
                
                    <button onClick={()=>handleUploadImg()}>Lưu</button>
                </div>
                <p>
                    Bằng cách tiếp tục, bạn đồng ý cho phép Spotify truy cập vào hình ảnh bạn đã chọn để tải lên. Vui lòng đảm bảo bạn có quyền tải lên hình ảnh.
                </p>
            </div>
        </div>

    );
}

export default Modal;