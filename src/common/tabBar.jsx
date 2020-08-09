import React from 'react'
import { TabBar } from 'antd-mobile'
import { Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import '../static/css/tarbar.less'

const navList = [
  {
      path: '/home', // 路由路径 
      component: () => import('@/components/Home/Home'),
      icon: '\ue653',
      text: '首页'
  },
  {
      path: '/movie', // 路由路径 
      component: () => import('@/components/Movie/Movie'),
      icon: '\ue618',
      text: '书影音',
  },
  {
      path: '/team', // 路由路径 
      component: () => import('@/components/Shop/Shop'),
      icon: '\ue630',
      text: '小组',
  },
  {
      path: '/shop', // 路由路径 
      component: () => import('@/components/Team/Team'),
      icon: '\ue6df',
      text: '市集',
  },
  {
      path: '/my', // 路由路径 
      component: () => import('@/components/My/My'),
      icon: '\ue62c',
      text: '我的',
  }
]

@withRouter
@connect(
  state => state
)

class TabBarList extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
      super(props)
    }
    
    render() {
        const { pathname } = this.props.location
        if (pathname === '/') { 
          return <Redirect to='/home'/> 
        }

        return (
          <div style={{ position: 'fixed', width: '100%', bottom: 0 }} className="tab_bar" >
            <TabBar
              unselectedTintColor="#9b9b9b"
              tintColor="#00B51D"
              barTintColor="#fff"
            >
              {
                navList.map(item => {
                  return (
                      <TabBar.Item
                        title={item.text}
                        key={item.path}
                        icon={<i className="iconfont">{item.icon}</i>}
                        selectedIcon={<i className="iconfont">{item.icon}</i>}
                        selected={ pathname === item.path}
                        onPress={() => {
                            this.props.history.replace(item.path)
                        }}
                    />
                  )
                })
              }
            </TabBar>
          </div>
        );
    }
}
export default TabBarList