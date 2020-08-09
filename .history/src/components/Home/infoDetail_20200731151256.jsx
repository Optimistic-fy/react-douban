/* eslint-disable no-useless-constructor */
import React from 'react'
import Header from '../../common/header'
import Tabbar from '../../common/detailTabbar'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getRecomDetail, getComment }  from './store/actionCreaters'

@withRouter
@connect(
    state => state.Home,
    {getRecomDetail, getComment}
)

class InfoDetail extends React.PureComponent{
    constructor(props) {
        super(props)
        this.state = ({
            id: '',
            show: false
        })
    }
    componentDidMount () {
        var id = this.props.match.params.id;
        this.setState({
            id
        })
        this.props.getRecomDetail({ topicId: id })
        this.props.getComment({
            pageSize: 10,
            topicId: id
        })
    }

    componentWillUnmount () {
        sessionStorage.setItem('id', this.props.match.params.id)
    }
    
    render () {
        const { recomDetail, comment } = this.props
        return(
            recomDetail ? <div className="detail">
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
            </div> : null
        )
    }
}

export default InfoDetail