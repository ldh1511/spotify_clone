import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './styles.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getShow, getPredominantColor, getPreviewUrl, GetSavedEpisodes } from '../../redux/actions/info';
import Banner from '../../components/Banner';
import PodcastList from '../../components/PodcastList';
import PodcastDescription from '../../components/PodcastDescription';
Podcast.propTypes = {
    location: PropTypes.object,
    getShowAction: PropTypes.func
};
Podcast.defaultProps = {
    showInfo: {
        name: '',
        images: [{ url: '' }]
    },
    episodes: { items: [] }
}
function Podcast(props) {
    const { location, getShowAction,
        showInfo, episodes,
        getPredominantColorAction,
        predominantColor, getPreviewUrlAction } = props;
    let pathname = location.pathname.split('/');
    let match = pathname[pathname.length - 1];
    useEffect(() => {
        getShowAction(match);
    }, [match, getShowAction])
    return (
        <div className="podcast-container">
            <Banner
                name={showInfo.name}
                image={showInfo.images[0] ? showInfo.images[0].url : ''}
                description={''}
                owner={showInfo.publisher}
                type={showInfo.type}
                custom={false}
                getPredominantColor={getPredominantColorAction}
                predominantColor={predominantColor}
            />
            <div className="mid-content" style={{ backgroundColor: `${predominantColor}` }}>
            </div>
            <div className="podcast-content">
                <PodcastList data={episodes.items} getPreviewUrl={getPreviewUrlAction} />
                <PodcastDescription data={showInfo.description} />
            </div>
        </div>
    );
}
const mapDispatchToProps = (dispatch) => {
    return {
        getShowAction: bindActionCreators(getShow, dispatch),
        getPredominantColorAction: bindActionCreators(getPredominantColor, dispatch),
        getPreviewUrlAction: bindActionCreators(getPreviewUrl, dispatch),
        getSavedEpisodesAction: bindActionCreators(GetSavedEpisodes, dispatch),
    }
};
const mapStateToProps = (state) => {
    return {
        showInfo: state.show.showInfo,
        episodes: state.show.episodes,
        predominantColor: state.ui.predominantColor,
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Podcast);