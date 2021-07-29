import * as constants from '../../constants/actions'
const musicInitialState = {
}
const music = (state = musicInitialState, action) => {
    switch (action.type) {
        case constants.GET_PREVIEW_URL:
            const data=action.payload;
            let listUrl=[];
            let listData=[];
            data.listTracks.map(item=>{
                listUrl.push(item.track.preview_url);
                listData.push(item.track);
                return true;
            })
            let index=listData.findIndex(item=>item.name===data.track.track.name);
            return {
                ...state,
                preview_url:data.track.track.preview_url,
                currentTrack:data.track,
                listUrl:listUrl,
                listData:listData,
                currentIndex:index
            }
        default:
            return state
    }
}
export default music; 