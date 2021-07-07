import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';
import PodcastItem from '../PodcastItem';
PodcastList.propTypes = {
    data:PropTypes.array
};

function PodcastList(props) {
    const {data}=props;
    const renderPodcastItem=()=>{
        let xhtml = null;
        xhtml=data.map(item=><PodcastItem key={item.id} data={item}/>)
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