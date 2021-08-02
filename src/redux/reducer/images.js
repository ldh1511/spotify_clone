import * as constants from '../../constants/actions'
const imagesInitialState = {
    currentImg:''
}
const images = (state = imagesInitialState, action) => {
    switch (action.type) {
        case constants.UPLOAD_PLAYLIST_IMAGE:
            return state
        case constants.UPLOAD_PLAYLIST_IMAGE_SUCCESS:
            return {
                ...state,
                img:action.payload
            }
        case constants.UPLOAD_PLAYLIST_IMAGE_FAILED:
            return state
        case constants.GET_CURRENT_IMG:
            return{
                ...state,
                currentImg:action.payload
            }
        default:
            return state
    }
}
export default images;