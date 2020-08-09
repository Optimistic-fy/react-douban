import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import store from './store/index'
import './static/iconfont.less'
import './static/normalize.less'
import 'lib-flexible'

import Home from './components/Home/Home'
import Movie from './components/Movie/Movie'
import Shop from './components/Shop/Shop'
import Team from './components/Team/Team'
import My from './components/My/My'
import TabBar from './common/tabBar'
import Write from './components/Home/write'
import Topic from './components/Home/topic'
import InfoDetail from './components/Home/infoDetail'

ReactDOM.render((
    // 得到当前请求的 path const pathname = this.props.location.pathname
    <Provider store = {store}>
        <BrowserRouter>
            <Switch>
                <Route path='/home' component={Home} />
                <Route path='/movie' component={Movie} />
                <Route path='/shop' component={Shop} />
                <Route path='/team' component={Team} />
                <Route path='/my' component={My} />
                <Route path='/write' component={Write} />
                <Route path='/topic' component={Topic} />
                <Route path='/infoDetail/:id' component={InfoDetail} />
                <Route component={TabBar} />
            </Switch>
        </BrowserRouter>
    </Provider>
    ), 
    document.getElementById('root')
);
