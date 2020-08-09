// actionType
const GET_LOADING = 'GET_LOADING'

// actions
function checkLoadign (data) {
    return {
        type: GET_LOADING,
        data
    }
}
export function showLoading () {
    return dispatch => {
        dispatch(checkLoadign(true))
    }
}
export function showLoading () {
    return dispatch => {
        dispatch(checkLoadign(true))
    }
}

// readucer
const initialState = {
    loading: false
}
export const loadingReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_LOADING:
            return {...state, loading: action.data}
        default:
            return state
    }
}