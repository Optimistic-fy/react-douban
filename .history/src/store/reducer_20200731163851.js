//combineReducers将小的reducer合并
import { combineReducers } from 'redux'
import { Home } from '../components/Home/store/reducer'

const reducer = combineReducers({
    Home
});
export default reducer;