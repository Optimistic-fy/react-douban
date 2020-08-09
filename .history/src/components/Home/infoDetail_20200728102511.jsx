/* eslint-disable no-useless-constructor */
import React from 'react'
import Header from '../../common/header'
import Tabbar from '../../common/detailTabbar'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getRecomDetail }  from './store/actionCreaters'
import Item from 'antd-mobile/lib/popover/Item'

@withRouter
@connect(
    state => state.Home,
    {getRecomDetail}
)

class InfoDetail extends React.PureComponent{
    constructor(props) {
        super(props)
    }
    componentDidMount () {
        var id = this.props.match.params.id;
        this.props.getRecomDetail({topicId:id})
    }
    
    render () {
        const { recomDetail } = this.props
        console.log('recomDetail', recomDetail)
        return(
            recomDetail ? <div className="detail">
                <Header />
                <div className="content">
                    <div className="top">
                        <div className="title">我是一个标题</div>
                        <div className="avatar-name">
                            <div className="avatar">
                                <img src={recomDetail.poster.avatar} alt=""/>
                            </div>
                            <div className="name">
                                <p>{recomDetail.poster.nickname}的日记</p>
                                <p>{recomDetail.updateTime.split(' ')[0]}</p>
                            </div>
                        </div>
                    </div>
                    <div className="detail-content">
                    <div className="text">
                            <p className="text-content">
                                {recomDetail.content}
                            </p>
                        </div>
                        <div className="picture">
                            <ul>
                                {recomDetail.imageList ? recomDetail.imageList.map((item) => {
                                    return(<li>
                                        <img src={require('../../images/view.jpg')} alt=""/>
                                    </li>)
                                }) : null }
                            </ul>
                        </div>
                    </div>
                </div>
                <Tabbar />
            </div> : null
        )
    }
}

export default InfoDetail