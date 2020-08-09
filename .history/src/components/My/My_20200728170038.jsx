import React from 'react'
import TabBar from '../../common/tabBar'

class My extends React.PureComponent{
    render(){
        return (
            <div>
                <div>My</div>
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
                <TabBar />
            </div>
        )
    }
}
export default My