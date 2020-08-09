import * as actionType from './actionType'

const defaultState = ({
    initialPage: 1,
    inputvalue: '',
    recomList: ''
});

export function Home(state = defaultState, action) {
    switch(action.type){
        case actionType.CHANGE_INITIAL_PAGE:
            return {...state, initialPage: action.data}
        case actionType.GET_INPUT_VALUE:
            return { ...state, inputvalue: action.data }
        case actionType.GET_RECOMMOND_LIST:
            return { ...state, recomList: action.data }
        default :
            return state;
    }
}