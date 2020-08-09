import { createStore , compose ,applyMiddleware } from 'redux';
import reducer from './reducer';
import thunk from 'redux-thunk';

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const composeEnhancers = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;
const store = createStore(reducer ,composeEnhancers(
    applyMiddleware(thunk) 
));

export default store;