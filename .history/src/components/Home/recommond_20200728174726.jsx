import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import '../../static/css/recommond.less'
import { getReList } from './store/actionCreaters'
import BScroll from 'better-scroll'

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
        })

        this.handleClickPicture = this.handleClickPicture.bind(this)
        this.handleScrolll = this.handleScrolll.bind(this);
    }

    componentDidMount(){
        document.getElementById('recList').scrollTop = sessionStorage.getItem('posit')
        this.props.getReList(this.state.search)
    }

    handleScrolll() {
        let top = this.scrollheight.scrollTop
        sessionStorage.setItem('posit', top)
    }

    handleClickPicture(){
        this.props.history.push('/preview')
    }

    render () {
        const { recomList } = this.props
      
        return(
            <div className="recom" id="recList" ref={c => this.scrollheight = c} onScrollCapture={() => this.handleScrolll()}>
                { recomList ? recomList.map((item) => {
                    return (
                        <div className="recommond" key={item.snowflakeId}>
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
                    )
                }) : null}
            </div>
        )
    }
}

export default Recommond