import * as actionType from './actionType'

const defaultState = ({
    initialPage: 1,
    inputvalue: '',     //输入搜索的值
    recomList: '',      //推荐列表
    recomDetail: '',    //推荐详情
    comment: ''         //推荐详情评论
});

export function Home(state = defaultState, action) {
    switch(action.type){
        case actionType.CHANGE_INITIAL_PAGE:
            return {...state, initialPage: action.data}
        case actionType.GET_INPUT_VALUE:
            return { ...state, inputvalue: action.data }
        case actionType.GET_RECOMMOND_LIST:
            return { ...state, recomList: action.data }
        case actionType.GET_RECOMMOM_DETAIL:
            return { ...state, recomDetail: action.data }
        case actionType.GET_RECOMMOM_DETAIL:
            return { ...state, recomDetail: action.data }
        
        default :
            return state;
    }
}