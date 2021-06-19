import * as constants from '../../constants/actions'
export const showLoading=()=>{
    return{
        type:constants.SHOW_LOADING
    }
}
export const hideLoading=()=>{
    return{
        type:constants.HIDE_LOADING
    }
}
export const showContentLoading=()=>{
    return{
        type:constants.SHOW_CONTENT_LOADING
    }
}
export const hideContentLoading=()=>{
    return{
        type:constants.HIDE_CONTENT_LOADING
    }
}