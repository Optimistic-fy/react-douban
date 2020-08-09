// actionType
const GET_LOADING = 'GET_LOADING'

// actions
function checkLoadign (data) {
    console.log('function data', data)
    return {
        type: GET_LOADING,
        data
    }
}
export function changeLoading (data) {
    console.log('data', data)
    return dispatch => {
        console.log('111')
        if (data) {
            dispatch(checkLoadign(true))
        } else {
            dispatch(checkLoadign(false))
        }
    }
}

// readucer
const initialState = {
    loading: false
}
export default function loadingReducer (state = initialState, action) {
    switch (action.type) {
        case GET_LOADING:
            console.log('action', action.data)
            return {...state, loading: action.data}
        default:
            return state
    }
}