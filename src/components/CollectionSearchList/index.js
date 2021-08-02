import React from 'react';
import PropTypes from 'prop-types';
import './styles.css'
import CollectionSearchItem from '../CollectionSearchItem';
CollectionSearchList.propTypes = {
    data: PropTypes.array
};
CollectionSearchList.defaultProps = {
    data:[]
}
function CollectionSearchList(props) {
    const { data, setLevelData, level, defaultimg, addItem, idPlaylist, albumInfo } = props;
    const renderItem = () => {
        let xhtml = null;
        xhtml = data.map(item => (
            <CollectionSearchItem
                key={item.id}
                data={item}
                setLevelData={setLevelData}
                defaultimg={defaultimg}
                addItem={addItem}
                idPlaylist={idPlaylist}
                albumInfo={albumInfo}
            />)
        )
        return xhtml
    }
    return (
        <div className="collection-search--list">
            {renderItem()}
            {level === 0 && data.length>0?
                <>
                    <div className="collection-search--item" onClick={() => setLevelData(1, 'all-artist')}>
                        <div className="search-item--left">
                            <div className="search-item--content"><h4>Xem tất cả nghệ sĩ</h4></div>
                        </div>
                        <div className="search-item--center"><p></p></div>
                        <div className="search-item--right">
                            <i className="fas fa-chevron-right"></i>
                        </div>
                    </div>
                    <div className="collection-search--item" onClick={() => setLevelData(1, 'all-album')}>
                        <div className="search-item--left">
                            <div className="search-item--content"><h4>Xem tất cả album</h4></div>
                        </div>
                        <div className="search-item--center"><p></p></div>
                        <div className="search-item--right">
                            <i className="fas fa-chevron-right"></i>
                        </div>
                    </div>
                    <div className="collection-search--item" onClick={() => setLevelData(1, 'all-track')}>
                        <div className="search-item--left">
                            <div className="search-item--content"><h4>Xem tất cả bài hát</h4></div>
                        </div>
                        <div className="search-item--center"><p></p></div>
                        <div className="search-item--right">
                            <i className="fas fa-chevron-right"></i>
                        </div>
                    </div>
                </> : <></>
            }
        </div>
    );
}

export default CollectionSearchList;