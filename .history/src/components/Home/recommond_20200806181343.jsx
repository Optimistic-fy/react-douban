import React from 'react'
import ReactDOM from 'react-dom'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { PullToRefresh, ListView } from 'antd-mobile';
import '../../static/css/Team.less'
import { getReList, clickPraise, getRecommList } from './store/actionCreaters'
import { changeLoading } from '../../store/loadingReaducer'
import Loading from '../../common/loading'

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
            height: document.documentElement.clientHeight,
            search: {
                hotDegree: 20,
                offset: 0,
                pageSize: 10
            },
            pageCount: 10
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
        const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop - 140;
        if (!localStorage.getItem('list')) {
            this.props.getReList(this.state.search).then((res) => {
                const { recomList } = this.props.Home
                setTimeout(() => {
                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(recomList),
                        height: hei,
                        refreshing: false
                    });
                    this.props.changeLoading(false)
                }, 1000);
            })
        } else {
            let list = JSON.parse(localStorage.getItem('list'))
            let parmas = JSON.parse(localStorage.getItem('listSearch'))
            setTimeout(() => {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(list),
                    height: hei,
                    refreshing: false,
                    search: parmas
                });
            }, 1000);    
        }
    }

    componentWillUnmount () {
        
    }
    
    //下拉刷新
    onRefresh = () => {
        // this.setState({ refreshing: true, isLoading: true });
        this.setState({
            search: {...this.state.search, offset: 0}
        })
        // const params = Object.assign({}, this.state.search, {
        //     offset: this.state.pageNumber
        // })
        const params = Object.assign({}, this.state.search)
        this.props.getReList(params).then(() => {
            const { recomList } = this.props.Home
            setTimeout(() => {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(recomList),
                    refreshing: false
                });
                this.props.changeLoading(false)
            }, 600);
        })
    };
    
    //上拉加载
    onEndReached = () => {
        const { loading } = this.props.loadingReducer
        if (loading) {   //处于加载状态时  直接返回  否则会触发多次加载事件
            return;
        }
        this.setState({
            search: {...this.state.search, offset: this.state.search.offset + 10}
        })
        const params = Object.assign({}, this.state.search)
        this.props.changeLoading(true)
        this.props.getReList(params).then(() => {
            const { recomList } = this.props.Home
            setTimeout(() => {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(recomList)
                });
                this.props.changeLoading(false)
            }, 1500);
        })
    };

    handlePraise = (id, index) => {
        this.props.clickPraise(id, index, 'list')
    }

    handleClickDetail = (ind, id) => {
        sessionStorage.setItem('index', ind)
        localStorage.setItem('listSearch', JSON.stringify(this.state.search))
        localStorage.setItem('list', JSON.stringify(this.props.Home.recomList))
        // localStorage.setItem('scrollHeight', scroll.y)
        this.props.history.push(`/infoDetail/${id}`)
    }
    
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
        const { loading } = this.props.loadingReducer
        return (
            <div className="list recom">
                <ListView
                    ref={el => this.lv = el}
                    dataSource={this.state.dataSource}
                    renderFooter={() => (
                        <div style={{ padding: 5, textAlign: 'center' }}>
                            {loading ? <Loading /> : 'Loaded'}
                        </div>
                    )}
                    renderRow={row}
                    style={{
                        height: this.state.height,
                        backgroundColor:'#f5f5f9'
                    }}
                    pullToRefresh={<PullToRefresh refreshing={this.state.refreshing} onRefresh={this.onRefresh}/>}
                    onEndReachedThreshold={40}
                    onEndReached={this.onEndReached}
                    pageSize={10}
                />
            </div>
        );
    }
}
export default Team