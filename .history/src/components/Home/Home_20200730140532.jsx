import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import TarBar from '../../common/tabBar'
import NavBar from '../../common/search'
import '../../static/css/Home.less'
import WriteSwiper from './swpier'
import { Tabs, Badge } from 'antd-mobile'
import Recommond from './recommond'
import PreView from './preView'

const tabs = [
    { title: <Badge>动态</Badge> },
    { title: <Badge>推荐</Badge> },
];

@withRouter
@connect(
    state => state.Home
)
class Home extends React.PureComponent{
    constructor(props){
        super(props)
        this.state = {
            showPre: false,
            imgList: [],
            imgIndex: 0
        }

        this.handleClickWrite = this.handleClickWrite.bind(this)
    }
    handleClickWrite(){
        this.props.history.push('/write')
    }

    setPriview = (result, msg) => {
        this.setState({
            showPre: msg.show,
            imgList: msg.list,
            imgIndex: msg.index
        })
    }
   
    render () {
        const { showPre } = this.state

        return (
            <div className="home">
                <NavBar />
                <div className="content">
                    <Tabs 
                        tabs={tabs}
                        swipeable={false}
                        initialPage={this.props.initialPage}
                        onChange={(tab, index) => { console.log('onChange', index, tab); }}
                        onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
                    >
                        <div style={{ height: '100%', backgroundColor:'#fff', position: 'relative'}}>
                            <WriteSwiper />
                        </div>
                        <div style={{ height: '100%', backgroundColor:'#f5f5f9', position: 'relative'}}>
                            <Recommond parent={this} />
                        </div>
                    </Tabs>
                    <div className="write-router" onClick={this.handleClickWrite}>
                        <span className="iconfont">&#xe62b;</span>
                    </div>
                </div>
                {/*预览*/}
                {showPre ? <PreView parent={this} /> : null}
                <TarBar />
            </div>
        )
    }
}
export default Home