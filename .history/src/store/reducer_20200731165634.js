//combineReducers将小的reducer合并
import { combineReducers } from 'redux'
import { Home } from '../components/Home/store/reducer'
import loadingReducer from './loadingReaducer'

const reducer = combineReducers({
    loadingReducer,
    Home
});
export default reducer;