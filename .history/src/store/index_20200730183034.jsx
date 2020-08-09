import { createStore , compose ,applyMiddleware } from 'redux';
import reducer from './reducer';
import thunk from 'redux-thunk';

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',    //放在localStorage中的key
    storage
}

const reducers = persistReducer(persistConfig, reducer)

const composeEnhancers = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;
const store = createStore(reducer ,composeEnhancers(
    applyMiddleware(thunk) 
));

export default store;