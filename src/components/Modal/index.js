import React, { useEffect, useRef, useState  } from 'react';
import logo from '../../assets/images/default.jpg';
import PropTypes from 'prop-types';
import './styles.css';
Modal.propTypes = {
    check: PropTypes.bool
};

function Modal(props) {
    const { check, closeModal, upload, id, currentImg, getCurImg, name, description, update } = props;
    const [img, setImg] = useState();
    const [imgSrc, setImgSrc] = useState(logo);
    const [data, setData] = useState({
        name: name,
        description: description
    });
    useEffect(() => {
        if(currentImg!==''){
            setImgSrc(currentImg)
        }
        else{
            setImgSrc(logo)
        }
    }, [currentImg])
    useEffect(() => {
        setData({
            name: name,
            description: description
        })
    }, [name, description])
    function useOutsideAlerter(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target) && check===true) {
                    closeModal();
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref,check]);
    }
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);
    const handleSelectImg = (event) => {
        setImg(event.target.files[0]);
        setImgSrc(URL.createObjectURL(event.target.files[0]))
    }
    const handleUploadImg = () => {
        if (img) {
            upload(id, img, imgSrc);
        }
        if (data.name !== name || data.description !== description) {
            update(id, data);
        }
        getCurImg(imgSrc);
        closeModal();
    }
    const handleUpdate = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value })
    }
    return (
        <div ref={wrapperRef} className={check === true ? 'modal-container modal-active' : 'modal-container'}>
            <div className='modal'>
                <div className="modal-top">
                    <h2>Edit details</h2>
                    <i className="fas fa-times" onClick={() => closeModal()}></i>
                </div>
                <form className="modal-middle">
                    <label htmlFor="upload" className="modal-image">
                        <img alt="" src={imgSrc} aria-hidden="true"></img>
                        <input
                            hidden type="file"
                            id="upload"
                            onChange={(e) => handleSelectImg(e)}
                            style={{ display: 'none' }}
                        />
                    </label>
                    <div className="modal-content">
                        <input type="text" name="name" placeholder="" value={data.name}
                            onChange={(e) => handleUpdate(e)}
                        />
                        <textarea name="description" rows="3" value={data.description}
                            onChange={(e) => handleUpdate(e)}
                        ></textarea>
                    </div>
                </form>
                <div className="modal-bottom">
                    <button onClick={() => handleUploadImg()}>Lưu</button>
                </div>
                <p>
                    Bằng cách tiếp tục, bạn đồng ý cho phép Spotify truy cập vào hình ảnh bạn đã chọn để tải lên. Vui lòng đảm bảo bạn có quyền tải lên hình ảnh.
                </p>
            </div>
        </div>

    );
}

export default Modal;