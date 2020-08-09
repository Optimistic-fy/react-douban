import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Drawer, Tabs, Badge } from 'antd-mobile'
import End from '../../common/end'
import { clickPraise } from './store/actionCreaters'

@withRouter
@connect(
    state => state,
    { clickPraise}
)

class DetailTabbar extends React.PureComponent{
    constructor(props){
        super(props)
        this.state = {
            show: false,
            clickReply: false,
            clickWriteReply: false
        }

        this.onOpenChange = this.onOpenChange.bind(this)
        this.handleOpenInput = this.handleOpenInput.bind(this)
        this.loseFocus = this.loseFocus.bind(this)
    }

    onOpenChange() {
        this.setState({ 
            show: !this.state.show,
            clickReply: !this.state.clickReply
        })
    }

    handleOpenInput(){
        this.setState({ 
            clickWriteReply: true
        })
    }

    loseFocus(){
        this.setState({
            clickWriteReply: false
        })
    }

    handlePraise = (id) => {
        let index = sessionStorage.getItem('index')
        this.props.clickPraise(id, index, 'detail')
    }

    render(){
        const { show, clickReply, clickWriteReply } = this.state
        const { info, commentlist } = this.props

        const tabs = [
            { title: <Badge text={commentlist.length}>回复</Badge> },
            { title: <Badge text={info.length}>赞</Badge> },
            { title: <Badge text={'1'}>转发</Badge> },
        ]

        const sidebar = (
            <Tabs 
                tabs={tabs}
                initialPage={0}
                style={{position:'fixed', top: 0,}}
                onChange={(tab, index) => { console.log('onChange', index, tab); }}
                onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
                >
                <div className="reply-list">
                    <ul>
                        {commentlist ? commentlist.map((item) => {
                            return (
                                <li className="reply-item" key={item.snowflakeId}>
                                    <div className="reply-left">
                                        <div className="reply-avatar">
                                            <img src={item.commentUser.avatar} alt=""/>
                                        </div>
                                    </div>
                                    <div className="replay-right">
                                        <div>
                                            <div className="name-time">
                                                <span className="write-name">{item.commentUser.nickname}</span>
                                                <span className="time">{item.createTime.split(' ')[0]}</span>
                                            </div>
                                            <p className="theme">{item.content}</p>
                                        </div>
                                        {item.replyList ? item.replyList.map((replyItem) => {
                                            return (
                                                <div className="reply" key={replyItem.snowflakeId}>
                                                    <div className="left">
                                                        <div className="avatar">
                                                            <img src={replyItem.replyUser.avatar} alt=""/>
                                                        </div>
                                                    </div>
                                                    <div className="right">
                                                        <div className="name-time">
                                                            <span className="write-name">{replyItem.replyUser.nickname}</span>
                                                            <span className="time">{replyItem.replyUser.createTime.split(' ')[0]}</span>
                                                        </div>
                                                        <p className="theme">{replyItem.content}</p>
                                                    </div>
                                                </div>
                                            )
                                        }) : null}
                                    </div>
                                </li>
                            )
                        }) : null}
                    </ul>
                    <End />
                </div>
                <div className="prase-list">
                    <ul className="prase">
                        {info ? info.map((item) => {
                            return (
                                <li className="prise-item" key={item.snowflakeId}>
                                    <img src={item.avatar} alt=""/>
                                    <span className="prise-name">{item.nickname}</span>
                                    <span className="parse-time">{item.createTime.split(' ')[0]}</span>
                                </li>
                            )
                       }) : null}
                    </ul>
                    <End />
                </div>
                <div className="forwarding-list">
                    <ul className="forwarding">
                        <li className="forwarding-item">
                            <img src={require('../../images/list6.jpeg')} alt=""/>
                            <span className="forwarding-name">柚子</span>
                            <span className="forwarding-time">8月10日</span>
                        </li>
                    </ul>
                    <End />
                </div>
            </Tabs>
        )
        return (
            <div className="detail-tabbar">
                <Drawer
                    className="my-drawer"
                    position="bottom"
                    enableDragHandle
                    contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 42 }}
                    sidebar={sidebar}
                    open={show}
                    onOpenChange={this.onOpenChange}
                >
                    <div className="icont">
                        <div className="origin-icon">
                            <span 
                                style={{display: !clickReply ? 'inline-block' : 'none', width: !clickReply ? '33%' :''}} 
                                className="comment iconfont" 
                                onClick={this.onOpenChange}
                                >&#xe69a;<span className="comment-count">{commentlist.length}</span></span>
                            <span 
                                style={{display: clickReply ? 'inline-block': 'none'}} 
                                className="comments"
                                >
                                <input 
                                    // eslint-disable-next-line no-sequences
                                    className={clickReply ? 'click-reply' : 'null', clickWriteReply ? 'write-comments' : 'null'} 
                                    onFocus={this.handleOpenInput} 
                                    onBlur={this.loseFocus}
                                    type="text" 
                                    placeholder="写回复..."/>
                                <span style={{display: clickWriteReply ? 'inline-block' :'none'}}>发布</span>
                            </span>
                            <span 
                                style={{ width: clickReply ? '15%' : '33%', display: !clickWriteReply ? 'inline-block' : 'none' }}
                                className={`iconfont ${info.praise ? 'like' : 'dislike'}`}
                                onClick={() => this.handlePraise(info.snowflakeId)}
                                >
                                    &#xe61b;
                                    <span className="like-count">{info.length}</span>
                            </span>
                            <span 
                                style={{width : clickReply ? '15%' : '33%', display: !clickWriteReply ? 'inline-block' :'none'}} 
                                className="reprint iconfont"
                                >
                                    &#xe62e;
                            </span>
                        </div>
                    </div>
                </Drawer>
            </div>
        )
    }
}
export default DetailTabbar