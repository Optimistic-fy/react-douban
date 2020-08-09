import * as actionType from './actionType'
import { get, post } from '@/utils/http'

function changePage(data) {
    return{
        type: actionType.CHANGE_INITIAL_PAGE, 
        data  
    }
}

export function changeInitialPage(data){
    return dispatch => {
        dispatch(changePage(data))
    }
}

function getInput(data) {
    return{
        type: actionType.GET_INPUT_VALUE, 
        data  
    }
}

export function getInputValue(data){
    return dispatch => {
        dispatch(getInput(data))
    }
}
//获取话题列表
//第一次加载 或 下拉更新
export function getRecommList (data) {
    return {
        type: actionType.GET_RECOMMOND_LIST,
        data
    }
}
//加载更多
function getMoreReList (data) {
    return {
        type: actionType.GET_MORE_RECOMMOND_LIST,
        data
    }
}

export const getReList = (params) => dispatch => {
    return post('api/dd/v2/topic/list', params).then(res => {
        if (res.status === 200) {
            let data = res.data.root
            if (params.offset === 0) {
                dispatch(getRecommList(data.content))
            } else {
                dispatch(getMoreReList(data.content))
            }
        }
    })
}

//获取话题详情
function getRecommDetail (data) {
    return {
        type: actionType.GET_RECOMMOM_DETAIL,
        data
    }
}

export const getRecomDetail = (params) => dispatch => {
    return post('/api/dd/v2/topic/detail', params).then(res => {
        if (res.status === 200) {
            dispatch(getRecommDetail(res.data.root))
        }
    })
}
//获取评论列表
function getCommentList (data) {
    return {
        type: actionType.GET_COMMENT,
        data
    }
}
export function getComment (params) {
    return dispatch => {
        post('/api/dd/v2/comment/page', params).then(res => {
            if (res.status === 200) {
                dispatch(getCommentList(res.data.root.content))
            }
        })
    }
}
//清除详情信息
function clearInfo () {
    return {
        type: actionType.CLEAR_DERTAIL_INFO
    }
}
export function clearDetailInfo () {
    return dispatch => {
        dispatch(clearInfo())
    }
}

//点赞
function getPraise (data) {
    return {
        type: actionType.CLICK_PRAISE,
        data
    }
}
export function clickPraise(id, index, str){
    return (dispatch, getState) => {
        let state = getState().Home
        if (state.recomList[index].praise) {
            // get(`/api/dd/v2/topic/praise/cancel/${id}`).then((res) => {
                let res = {data:{
                    code: 200,
                    msg: null,
                    root: true
                }}
                if (res.data.root) {
                    if (str === 'list') {
                        state.recomList[index].praise = false
                        state.recomList[index].praiseCount--
                    } else {
                        state.recomList[index].praise = false
                        state.recomList[index].praiseCount--
                        state.recomDetail.praise = false
                        state.recomDetail.praiseCount--
                    }
                    dispatch(getPraise({list: state.recomList, detail: state.recomDetail}))
                }
            // })
        } else {
            // get(`/api/dd/v2/topic/praise/${id}`).then((res) => {
            let res = {data:{
                code: 200,
                msg: null,
                root: true
            }}
            if (res.data.root) {
                if (str === 'list') {
                    state.recomList[index].praise = true
                    state.recomList[index].praiseCount++ 
                } else {
                    state.recomList[index].praise = true
                    state.recomList[index].praiseCount++ 
                    state.recomDetail.praise = true
                    state.recomDetail.praiseCount++   
                }
                dispatch(getPraise({list: state.recomList, detail:state.recomDetail}))
            }
            // })
        }
    }
}

//上传图片
function upImg (data) {
    return {
        type: actionType.UP_LOAD_IMAGE,
        data
    }
}
export function uploadImg (files, formData) {
    return dispatch => {
        post(`/api/dd/v2/upload/image`, formData).then((res) => {
            
        })
    }
}