/* eslint-disable no-useless-constructor */
import React from 'react'
import Header from '../../common/header'
import Tabbar from '../../common/detailTabbar'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getRecomDetail, getComment, clearDetailInfo } from './store/actionCreaters'
import { changeLoading } from '../../store/loadingReaducer'
import Loading from '../../common/loading'

@withRouter
@connect(
    state => state,
    {getRecomDetail, getComment, changeLoading, clearDetailInfo}
)

class InfoDetail extends React.PureComponent{
    constructor(props) {
        super(props)
        this.stste = ({
            index: 0
        })
    }
    componentDidMount () {
        var id = this.props.match.params.id;
        var index = this.props.match.params.index
        this.setState({
            index
        })
        this.props.getComment({ pageSize: 10, topicId: id })
        this.props.getRecomDetail({ topicId: id }).then(() => {
            this.props.changeLoading(false)
        })
    }
    componentWillUnmount () {
        this.props.clearDetailInfo()
    }
    
    render () {
        const { recomDetail, comment } = this.props.Home
        const { loading } = this.props.loadingReducer

        return(
            !loading ? recomDetail ? <div className="detail">
                <Header />
                <div className="content">
                    <div className="top">
                        {/*<div className="title">我是一个标题</div>*/}
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
                                {recomDetail.imageList ? recomDetail.imageList.map((item, index) => {
                                    return (
                                        <li key={index}>
                                            <img src={item} alt=""/>
                                        </li>
                                    )
                                }) : null }
                            </ul>
                        </div>
                    </div>
                </div>
                <Tabbar info={recomDetail.praiseList} commentlist={comment} />
            </div> : null : <Loading />
        )
    }
}

export default InfoDetail