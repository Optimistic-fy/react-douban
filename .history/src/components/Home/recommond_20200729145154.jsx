import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import BScroll from 'better-scroll'
import '../../static/css/recommond.less'
import { getReList } from './store/actionCreaters'

@withRouter
@connect(
    state => state.Home,
    {getReList}
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
            isLoading: true,  //s是否加载中
            isHasMore: false, //是否还有更多数据
            bScroll: null
        })

        this.handleClickPicture = this.handleClickPicture.bind(this)
        this.handleScrolll = this.handleScrolll.bind(this);
    }

    componentDidMount(){
        // document.getElementById('recList').scrollTop = sessionStorage.getItem('posit')
        this.props.getReList(this.state.search)

        // const wrapper = document.querySelector('#recList')
        this.setState({
            bScroll: new BScroll(this.refs.bscroll, {
                click: true,  // better-scroll 默认会阻止浏览器的原生 click 事件
                scrollY: true, //关闭竖向滚动
                pullDownRefresh: {
                    threshold: 50
                },
                pullUpLoad: {
                    threshold: -40
                },
                scrollbar: {
                    fade: true,
                    interactive: false
                }
            }),
        })
        this.handleScrolll()
    }

    componentDidUpdate () {
        //组件更新后，如果实例化了better-scroll并且需要刷新就调用refresh()函数
        if (this.state.bScroll) {
            this.state.bScroll.refresh();
        }
    }

    handleScrolll() {
        // let top = this.scrollheight.scrollTop
        // sessionStorage.setItem('posit', top)
        this.state.bScroll.on('pullingDown', () => {
            this.onDownRefresh()
        })
        this.state.bScroll.on('pullingDown', () => {
            this.onLoad()
        })
    }

    handleClickPicture(){
        this.props.history.push('/preview')
    }

    onDownRefresh = () => {
        console.log('下拉刷新');
    }

    onLoad = () => {
        console.log('上啦加载');
    }

    // setScroll = () => {
    //     this.setState({
    //         bScroll: new BScroll(this.refs.bscroll, {
    //             click: true,  // better-scroll 默认会阻止浏览器的原生 click 事件
    //             scrollY: true, //关闭竖向滚动
    //             pullDownRefresh: {
    //                 threshold: 50
    //             },
    //             pullUpLoad: {
    //                 threshold: -40
    //             },
    //             scrollbar: {
    //                 fade: true,
    //                 interactive: false
    //             }
    //         }),
    //     }
    // }

    render () {
        const { recomList } = this.props
      
        return(
            // <div className="recom" id="recList" ref={c => this.scrollheight = c} onScrollCapture={() => this.handleScrolll()}>
            <div className="recom" id="recList" ref="bscroll">
                <ul>
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
                                                        <li onClick={this.handleClickPicture} key={index}>
                                                            <img src={image} alt=""/>
                                                        </li>
                                                    )
                                                }) : null}
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
                </ul>
            </div>
        )
    }
}

export default Recommond