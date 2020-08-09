import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import BScroll from 'better-scroll'
import '../../static/css/recommond.less'
import { getReList, clickPraise, getRecommList } from './store/actionCreaters'
import { changeLoading } from '../../store/loadingReaducer'

let scroll = null

@withRouter
@connect(
    state => state,
    {getReList, clickPraise, getRecommList, changeLoading}
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
            pageNumber: 0
        })
    }

    componentDidMount(){
        // document.getElementById('recList').scrollTop = sessionStorage.getItem('posit')
        let data = JSON.parse(localStorage.getItem('listSearch'))
        if (data !== null) {
            this.props.changeLoading(false)
            this.setState({
                search: data.search,
                pageNumber: data.pageNumber
            })
            console.log(' this.refScroll',  this.refScroll)
            this.refScroll.scrollTo({x:0, y:localStorage.getItem('scrollHeight'), animated: true})
        } else {
            this.props.getReList(this.state.search).then((res) => {
                this.props.changeLoading(false)
            })
            this.initialScroll()
        }
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
            scroll = new BScroll(this.refScroll, {
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
        this.props.getReList(params).then(() => {
            scroll.finishPullDown()
        })
    }

    onLoad = () => {
        this.setState({
            pageNumber: this.state.pageNumber + 10
        })
        const params = Object.assign({}, this.state.search, {
            offset: this.state.pageNumber
        })
        this.props.getReList(params).then(() => {
            scroll.finishPullUp()
        })
    }

    handlePraise = (id, index) => {
        this.props.clickPraise(id, index, 'list')
    }

    handleClickDetail = (ind, id) => {
        sessionStorage.setItem('index', ind)
        localStorage.setItem('listSearch', JSON.stringify(this.state))
        localStorage.setItem('scrollHeight', scroll.y)
        this.props.history.push(`/infoDetail/${id}`)
    }

    render () {
        const { recomList } = this.props.Home
      
        return(
            // <div className="recom" id="recList" ref={c => this.scrollheight = c} onScrollCapture={() => this.handleScrolll()}>
            
            <div className="recom" id="recList" ref={(scroll) => {this.refScroll = scroll}}>
                <ul ref="ulList">
                    <div className="down" ref="downRefresh">下拉刷新</div>
                    { recomList ? recomList.map((item, index) => {
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
                                        {/*<Link to={`/infoDetail/${item.snowflakeId}`} >*/}
                                            <div className="text" onClick={() => this.handleClickDetail(index, item.snowflakeId)} >
                                                <p className="text-content" >
                                                    {item.content}
                                                    {/* <span>全文</span> */}
                                                </p>
                                            </div>
                                        {/*</Link>*/}
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
                                        <span className={`iconfont ${item.praise ? 'like' : 'dislike'}`} onClick={() => this.handlePraise(item.snowflakeId, index)}>
                                            &#xe61b;
                                            <span className="like-count">{item.praiseCount} </span>
                                        </span>  
                                        <span className="comment iconfont" onClick={() => this.handleClickDetail(index, item.snowflakeId)}>
                                            &#xe69a;
                                            <span className="comment-count">{item.replyUserCount}</span>
                                        </span>
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