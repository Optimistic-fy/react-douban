import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import BScroll from 'better-scroll'
import '../../static/css/recommond.less'
import Loading from '../../common/loading'
import { getReList } from './store/actionCreaters'
import { changeLoading } from '../../store/loadingReaducer'

let scroll = null

@withRouter
@connect(
    state => state,
    {getReList,changeLoading}
)

class Recommond extends React.PureComponent{
    constructor(props){
        super(props)
        this.state = ({
            search: {
                hotDegree: 20,
                offset: 0,
                pageSize: 10
            },
            pageNumber: 10,
            isLoading: true,  //是否加载中
            isHasMore: false, //是否还有更多数据
        })
    }

    componentDidMount(){
        // document.getElementById('recList').scrollTop = sessionStorage.getItem('posit')
        getReList(this.state.search)
        this.initialScroll()
        // console.log('1111111', localStorage.getItem('persist:root'))
    }

    componentDidUpdate () {
        //组件更新后，如果实例化了better-scroll并且需要刷新就调用refresh()函数
        if (scroll) {
            scroll.refresh()
        } else {
            this.initialScroll()
        }
    }

    componentWillUnmount () {
        scroll && scroll.destroy()
        //销毁之后一定要负值  否则就没有滚动实例  就不会有滚动
        scroll = null
    }

    initialScroll = () => {
        if (!scroll) {
            scroll = new BScroll(this.refs.bscroll, {
                click: true,  // better-scroll 默认会阻止浏览器的原生 click 事件
                scrollY: true, //关闭竖向滚动
                scrollbar: {
                    fade: true,
                    interactive: false
                },
                startY: 0,
                probeType: 3,
                pullDownRefresh: {
                    threshold: 50,
                },
                pullUpLoad: {
                    threshold: -40 // 在上拉到超过底部 20px 时，触发 pullingUp 事件
                },
            })
            scroll.on('pullingDown', () => {
                this.onDownRefresh()
            })
            scroll.on('pullingUp', () => {
                this.onLoad()
            })
            scroll.on('scroll', (position) => {
                if (position.y > 60) {
                    this.refs.downRefresh.innerHTML = '释放立即刷新'
                } else {
                    this.refs.downRefresh.innerHTML = '下拉刷新'
                }
            })
            // scroll.on('touchEnd', (position) => {  //会出现弹动的情况
            //     if (position.y > 80) {
            //         this.onDownRefresh()
            //     } else if (position.y < (scroll.maxScrollY - 20)) {
            //         this.onLoad()
            //     }
            // })
        } else {
            scroll.refresh()
        }
    }

    handleClickPicture (list, index) {
        this.props.parent.setPriview(this, {list, index, show: true})
    }

    onDownRefresh = () => {
        this.setState({
            pageNumber: 0
        })
        const params = Object.assign({}, this.state.search, {
            offset: this.state.pageNumber
        })
        this.props.changeLoading(true)
        getReList(params).then(() => {
            scroll.finishPullDown()
            scroll.refresh()
        })
        this.props.changeLoading(false)
    }

    onLoad = () => {
        this.setState({
            pageNumber: this.state.pageNumber + 10
        })
        const params = Object.assign({}, this.state.search, {
            offset: this.state.pageNumber
        })
        this.props.changeLoading(true)
        getReList(params).then(() => {
            scroll.finishPullUp()
            scroll.refresh()
        })
        this.props.changeLoading(false)
    }

    render () {
        const { recomList } = this.props.Home
        const { loading } = this.props.loadingReducer
      
        return(
            // <div className="recom" id="recList" ref={c => this.scrollheight = c} onScrollCapture={() => this.handleScrolll()}>
            loading ? <Loading /> : <div className="recom" id="recList" ref="bscroll">
                <ul>
                    <div className="down" ref="downRefresh">下拉刷新</div>
                    { recomList ? recomList.map((item) => {
                        return (
                            <li key={item.snowflakeId}>
                                <div className="recommond">
                                    <div className="head">
                                        <span>
                                            <img src={item.poster.avatar} alt="头像"/>
                                        </span>
                                        <span className="writer_name">{item.poster.nickname}</span>
                                        <span className="iconfont share">&#xe708;</span>
                                    </div>
                                    <div className="recommon-content">
                                        { item.themeTitle ? <div className="hot">
                                            <span className="icon">#</span>
                                            <span className="hot-tittle">{ item.themeTitle }</span>
                                        </div> : null}
                                        <Link to={`/infoDetail/${item.snowflakeId}`}>
                                            <div className="text" >
                                                <p className="text-content" >
                                                    {item.content}
                                                    {/* <span>全文</span> */}
                                                </p>
                                            </div>
                                        </Link>
                                        <div className="picture">
                                            <ul>
                                                {item.imageList ? item.imageList.map((image, index) => {
                                                    return (
                                                        <li onClick={() => this.handleClickPicture(item.imageList, index)} key={index}>
                                                            <img src={image} alt=""/>
                                                        </li>
                                                    )
                                                }) : null}
                                                {/*item.imageList ? <PreView imglist={item.imageList} /> : null*/}
                                                {/*<li className="more-pic" onClick={this.getInfoDetail}>
                                                    <img src={require('../../images/list8.jpeg')} alt=""/>
                                                    <div className="mask">
                                                        +4
                                                    </div>
                                                </li> */}
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="bottom">
                                <span className="like iconfont">&#xe61b;<span className="like-count">{item.praiseCount}</span></span>
                                <Link to={`/infoDetail/${item.snowflakeId}`}>
                                    <span className="comment iconfont" >&#xe69a;<span className="comment-count">{item.replyUserCount}</span></span>
                                </Link>
                                <span className="reprint iconfont">&#xe62e;</span>
                            </div>
                                </div>
                            </li>
                        )
                    }) : null}
                    <div className="no-more" ref="upLoadMore">上拉加载更多...</div>
                </ul>
            </div>
        )
    }
}

export default Recommond