import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';
import PodcastItem from '../PodcastItem';
PodcastList.propTypes = {
    data:PropTypes.array
};

function PodcastList(props) {
    const {data, getPreviewUrl}=props;
    const renderPodcastItem=()=>{
        let xhtml = null;
        xhtml=data.map(item=>(<PodcastItem 
            key={item.id} 
            data={item}
            getPreviewUrl={getPreviewUrl}
            listData={data}
            />))
        return xhtml;
    }
    return (
        <div className="podcast-list">
            <h2>Tất cả các tập</h2>
            <ul>
                {renderPodcastItem()}
                
            </ul>
        </div>
    );
}

export default PodcastList;