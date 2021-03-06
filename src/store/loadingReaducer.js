// actionType
const GET_LOADING = 'GET_LOADING'

// actions
function checkLoadign (data) {
    return {
        type: GET_LOADING,
        data
    }
}
export function changeLoading (data) {
    return dispatch => {
        if (data) {
            dispatch(checkLoadign(true))
        } else {
            dispatch(checkLoadign(false))
        }
    }
}

// readucer
const initialState = {
    loading: true
}
export default function loadingReducer (state = initialState, action) {
    switch (action.type) {
        case GET_LOADING:
            return {...state, loading: action.data}
        default:
            return state
    }
}