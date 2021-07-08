import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './styles.css';
import { connect } from 'react-redux';
import CardList from '../../components/CardList';
import AlbumBlock from '../../components/AlbumBlock';
import { getAlbumTracks } from '../../redux/actions/info';
import { bindActionCreators } from 'redux';
import { useHistory } from 'react-router';
Albums.propTypes = {
    albums: PropTypes.object,
    getAlbumTracksAction: PropTypes.func,
    albumtracks: PropTypes.array
};
Albums.defaultProps = {
    albums: {
        items: []
    },
    albumtracks: [],
    singles:[]
}
function Albums(props) {
    const history = useHistory();
    const [list, setList] = useState(false);
    const { albums, name, getAlbumTracksAction, albumtracks, location, singles } = props;
    let { items } = albums;
    console.log(albumtracks);
    items=items.filter(item=>item.album_type==='album');
    const pathname = location.pathname.split('/');
    const match = pathname[pathname.length - 1];
    const [type, setType]=useState(match);
    const renderCardListTable = () => {
        let xhtml = null;
        xhtml = <CardList data={type==='albums'?items:singles} type='album'/>
        return xhtml;
    }
    useEffect(() => {
        let idArr = [];
        let data=type==='albums'? items:singles;
        data.map((item) => {
            idArr.push(item.id)
            return true;
        })
        getAlbumTracksAction(idArr)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [type])
    const renderCardList = () => {
        let xhtml = null;
        xhtml = (
            <div className="album-blocks">
                {
                type==='albums'?
                albumtracks.map((item, i) => <AlbumBlock data={[item.data.items, items[i]]} />):
                albumtracks.map((item, i) => <AlbumBlock data={[item.data.items, singles[i]]} />)}
            </div>
        )
        return xhtml;
    }
    const handleSelectType= (e) => {
        const {value}=e.target;
        setType(value);
        pathname[pathname.length - 1]=value;
        let newUrl=pathname.join('/');
        history.replace({pathname:newUrl})
    }
    return (
        <div className="albums">
            <div className="albums-filter">
                <h2>{name}</h2>
                <div className="albums-filter-right">
                    <select 
                        className="select-box" 
                        name="select" 
                        value={type} 
                        onChange={(e)=>handleSelectType(e)}
                    >
                        <option value='albums'>Album</option>
                        <option value='singles'>Single</option>
                    </select>
                    <div className="filter-block">
                        <i className="fas fa-list-ul" onClick={() => { setList(true) }}></i>
                        <i className="fas fa-border-all" onClick={() => { setList(false) }}></i>
                    </div>
                </div>
            </div>
            {list === true ? renderCardList() : renderCardListTable()}
        </div>
    );
}
const mapStateToProps = (state) => {
    return {
        albums: state.artist.albums,
        singles: state.artist.singles,
        name: state.artist.artistInfo.name,
        albumtracks: state.artist.albumtracks
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getAlbumTracksAction: bindActionCreators(getAlbumTracks, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Albums);