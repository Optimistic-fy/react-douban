import React from 'react'
import ReactDOM from 'react-dom'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { PullToRefresh, ListView } from 'antd-mobile';
import '../../static/css/Team.less'
import { getReList, clickPraise, getRecommList } from './store/actionCreaters'
import { changeLoading } from '../../store/loadingReaducer'

@withRouter
@connect(
    state => state,
    {getReList, clickPraise, getRecommList, changeLoading}
)

class Team extends React.PureComponent{
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
    
        this.state = {
            dataSource,
            refreshing: true,
            isLoading: true,
            height: document.documentElement.clientHeight,
            search: {
                hotDegree: 20,
                offset: 0,
                pageSize: 10
            },
            pageNumber: 0
        };
    }
    
    // If you use redux, the data maybe at props, you need use `componentWillReceiveProps`
    // componentWillReceiveProps(nextProps) {
    //   if (nextProps.dataSource !== this.props.dataSource) {
    //     this.setState({
    //       dataSource: this.state.dataSource.cloneWithRows(nextProps.dataSource),
    //     });
    //   }
    // }
    
    componentDidMount () {
        const { recomList } = this.props.Home
        const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop - 140;
        this.props.getReList(this.state.search).then((res) => {
            this.props.changeLoading(false)
        })
    
        setTimeout(() => {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(recomList),
                height: hei,
                refreshing: false,
                isLoading: false,
            });
        }, 1000);
    }

    componentWillUnmount () {
        
    }
    
    //下拉刷新
    onRefresh = () => {
        const { recomList } = this.props.Home
        // this.setState({ refreshing: true, isLoading: true });
        this.setState({
            pageNumber: 0
        })
        const params = Object.assign({}, this.state.search, {
            offset: this.state.pageNumber
        })
        this.props.getReList(params).then(() => {
            setTimeout(() => {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(recomList),
                    refreshing: false,
                    isLoading: false,
                });
            }, 600);
        })
    };
    
    //上拉加载
    onEndReached = () => {
        this.setState({
            pageNumber: this.state.pageNumber + 10
        })
        const params = Object.assign({}, this.state.search, {
            offset: this.state.pageNumber
        })
        this.setState({ isLoading: true });
        this.props.getReList(params).then(() => {
            const { recomList } = this.props.Home
            setTimeout(() => {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(recomList),
                    isLoading: false,
                });
            }, 1000);
        })
        // if (this.state.isLoading && !this.state.hasMore) {
        //     return;
        // }
    };
    
    render() {
        const row = (rowData, sectionID, rowID) => {
            return (
                <div key={rowID}
                    style={{
                        marginBottom: '10px',
                        background: '#fff'
                    }}
                    >
                    <div key={rowData.snowflakeId}>
                        <div className="recommond">
                            <div className="head">
                                <span>
                                    <img src={rowData.poster.avatar} alt="头像"/>
                                </span>
                                <span className="writer_name">{rowData.poster.nickname}</span>
                                <span className="iconfont share">&#xe708;</span>
                            </div>
                            <div className="recommon-content">
                                { rowData.themeTitle ? <div className="hot">
                                    <span className="icon">#</span>
                                    <span className="hot-tittle">{ rowData.themeTitle }</span>
                                </div> : null}
                                {/*<Link to={`/infoDetail/${item.snowflakeId}`} >*/}
                                    <div className="text" onClick={() => this.handleClickDetail(rowID, rowData.snowflakeId)} >
                                        <p className="text-content" >
                                            {rowData.content}
                                            {/* <span>全文</span> */}
                                        </p>
                                    </div>
                                {/*</Link>*/}
                                <div className="picture">
                                    <ul>
                                        {rowData.imageList ? rowData.imageList.map((image, index) => {
                                            return (
                                                <li onClick={() => this.handleClickPicture(rowData.imageList, index)} key={index}>
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
                                <span className={`iconfont ${rowData.praise ? 'like' : 'dislike'}`} onClick={() => this.handlePraise(rowData.snowflakeId, rowID)}>
                                    &#xe61b;
                                    <span className="like-count">{rowData.praiseCount} </span>
                                </span>  
                                <span className="comment iconfont" onClick={() => this.handleClickDetail(rowID, rowData.snowflakeId)}>
                                    &#xe69a;
                                    <span className="comment-count">{rowData.replyUserCount}</span>
                                </span>
                                <span className="reprint iconfont">&#xe62e;</span>
                            </div>
                        </div>
                    </div>
                </div>
            );
        };
        return (
            <div className="list recom">
                <ListView
                    key={'1'}
                    ref={el => this.lv = el}
                    dataSource={this.state.dataSource}
                    renderFooter={() => (
                        <div style={{ padding: 30, textAlign: 'center' }}>
                            {this.state.isLoading ? 'Loading...' : 'Loaded'}
                        </div>
                    )}
                    renderRow={row}
                    style={{
                        height: this.state.height,
                        backgroundColor:'#f5f5f9'
                    }}
                    pullToRefresh={<PullToRefresh refreshing={this.state.refreshing} onRefresh={this.onRefresh}/>}
                    onEndReached={this.onEndReached}
                    pageSize={10}
                />
            </div>
        );
    }
}
export default Team