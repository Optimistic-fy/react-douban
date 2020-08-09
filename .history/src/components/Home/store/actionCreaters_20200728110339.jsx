import * as actionType from './actionType'
import axios from 'axios'

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
function getRecommList (data) {
    return {
        type: actionType.GET_RECOMMOND_LIST,
        data
    }
}

export function getReList(params){
    return dispatch => {
        axios.post('api/dd/v2/topic/list', params).then(res => {
            if (res.status === 200) {
                let data = res.data.root
                dispatch(getRecommList(data.content))
            }
        })
    }
}
//获取话题详情
function getRecommDetail (data) {
    return {
        type: actionType.GET_RECOMMOM_DETAIL,
        data
    }
}

export function getRecomDetail (params) {
    return dispatch => {
        axios.post('/api/dd/v2/topic/detail', params).then(res => {
            if (res.status === 200) {
                dispatch(getRecommDetail(res.data.root))
            }
        })
    }
}
//获取评论列表
function getComment (params) {
    return dispatch => {
        axios.post('/api/dd/v2/comment/page', params).then(res => {
            console.log('res', res);
            
        })
    }
}