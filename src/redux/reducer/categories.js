import * as constants from '../../constants/actions'
const categoriesInitialState = {}
const categories = (state = categoriesInitialState, action) => {
    switch (action.type) {
        case constants.GET_CATEGORY:
            return {
                ...state
            }
        case constants.GET_CATEGORY_SUCCESS:
            return {
                ...state,
                categoryInfo:action.payload[0],
                categoryPlaylist:action.payload[1].playlists.items
            }
        case constants.GET_CATEGORY_FAILED:
            return {
                ...state
            }
        case constants.GET_CATEGORIES:
            return{
                ...state
            }
        case constants.GET_CATEGORIES_SUCCESS:
            return{
                ...state,
                categories:action.payload
            }
        case constants.GET_CATEGORIES_FAILED:
            return{
                ...state
            }
        default:
            return state
    }
}
export default categories;