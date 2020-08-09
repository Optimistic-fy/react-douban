import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import store from './store/index'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { persistor } from './store/index'
import './static/iconfont.less'
import './static/normalize.less'
import 'lib-flexible'


ReactDOM.render((
    // 得到当前请求的 path const pathname = this.props.location.pathname
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
                <Switch>
                    <Route path='/home' component={() => import('./components/Home/Home')} />
                    <Route path='/movie' component={() => import('./components/Movie/Movie')} />
                    <Route path='/shop' component={() => import('./components/Shop/Shop')} />
                    <Route path='/team' component={() => import('./components/Team/Team')} />
                    <Route path='/my' component={() => import('./components/My/My')} />
                    <Route path='/write' component={() => import('./components/Home/write')} />
                    <Route path='/topic' component={() => import('./components/Home/topic')} />
                    <Route path='/infoDetail/:id' component={() => import('./components/Home/infoDetail')} />
                    <Route component={() => import('./common/tabBar')} />
                </Switch>
            </BrowserRouter>
        </PersistGate>
        
    </Provider>
    ), 
    document.getElementById('root')
);
