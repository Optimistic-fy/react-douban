// actionType
const GET_LOADING = 'GET_LOADING'

// actions

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