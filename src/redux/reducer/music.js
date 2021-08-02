import * as constants from '../../constants/actions'
const musicInitialState = {}
const music = (state = musicInitialState, action) => {
    switch (action.type) {
        case constants.GET_PREVIEW_URL:
            const data=action.payload;
            let listUrl=[];
            let listData=[];
            data.listTracks.map(item=>{
                if(item.track && item.track.id){
                    listUrl.push(item.track.preview_url);
                    listData.push(item.track);
                }
                else if(item && item.audio_preview_url){
                    listUrl.push(item.audio_preview_url);
                    listData.push(item);
                }
                else if(item && item.id){
                    listUrl.push(item.preview_url);
                    listData.push(item);
                }
                else{}
                return true;
            })
            let index, preview_url, currentTrack;
            if(data.track.track){
                index=listData.findIndex(item=>item.name===data.track.track.name);
                preview_url=data.track.track.preview_url;
                currentTrack=data.track
            }
            else if(data.track.audio_preview_url){
                index=listData.findIndex(item=>item.name===data.track.name);
                preview_url=data.preview_url;
                currentTrack=data.track;
            }
            else{
                index=listData.findIndex(item=>item.name===data.track.name);
                preview_url=data.preview_url;
                currentTrack=data;
            }
            return {
                ...state,
                preview_url:preview_url,
                currentTrack:currentTrack,
                listUrl:listUrl,
                listData:listData,
                currentIndex:index
            }
        default:
            return state
    }
}
export default music; 