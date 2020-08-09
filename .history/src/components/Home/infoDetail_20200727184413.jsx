/* eslint-disable no-useless-constructor */
import React from 'react'
import Header from '../../common/header'
import Tabbar from '../../common/detailTabbar'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getRecomDetail }  from './store/actionCreaters'

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
            <div className="detail">
                <Header />
                <div className="content">
                    <div className="top">
                        <div className="title">我是一个标题</div>
                        <div className="avatar-name">
                            <div className="avatar">
                                <img src={recomDetail.} alt=""/>
                            </div>
                            <div className="name">
                                <p>xxx的日记</p>
                                <p>2019-02-20</p>
                            </div>
                        </div>
                    </div>
                    <div className="detail-content">
                    <div className="text">
                            <p className="text-content">
                                我是一段文字我是一段文字我是一段文字我是一段文字我是一段文字我是一段文字我是一段文字我是一段文字<br />
                                我是一段文字我是一段文字我是一段文字我是一段文字我是一段文字我是一段文字我是我是一段文字我是一段文字我是一段文字我是一段文字我是一段文字我是一段文字我是文字我是一段文字我是一段文字我是
                            </p>
                        </div>
                        <div className="picture">
                            <ul>
                                <li>
                                    <img src={require('../../images/view.jpg')} alt=""/>
                                </li>
                                <li>
                                    <img src={require('../../images/view1.jpg')} alt=""/>
                                </li>
                                <li>
                                    <img src={require('../../images/view2.jpeg')} alt=""/>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <Tabbar />
            </div>
        )
    }
}

export default InfoDetail