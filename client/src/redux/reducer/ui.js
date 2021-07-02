import * as constants from '../../constants/actions'
const uiInitialState = {
    showLoading: false,
    showContentLoading: false,
    openModal:false
}
const ui = (state = uiInitialState, action) => {
    switch (action.type) {
        case constants.SHOW_LOADING:
            return {
                ...state,
                showLoading:true
            }
        case constants.HIDE_LOADING:
            return {
                ...state,
                showLoading:false
            }
        case constants.SHOW_CONTENT_LOADING:
            return{
                ...state,
                showContentLoading:true
            }
        case constants.HIDE_CONTENT_LOADING:
            return{
                ...state,
                showContentLoading:false
            }
        case constants.OPEN_MODAL:
            return{
                ...state,
                openModal:true
            }
        case constants.CLOSE_MODAL:
            return{
                ...state,
                openModal:false
            }
        default:
            return state
    }
}
export default ui;