import React from 'react'
import ReactDOM from 'react-dom'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import TabBar from '../../common/tabBar'
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
            }
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
        const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;
        this.props.getReList(this.state.search).then((res) => {
            this.props.changeLoading(false)
        })
    
        setTimeout(() => {
            this.rData = recomList;
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(recomList),
                height: hei,
                refreshing: false,
                isLoading: false,
            });
        }, 1500);
    }

    componentWillUnmount () {
        
    }
    
    onRefresh = () => {
        const { recomList } = this.props.Home
        this.setState({ refreshing: true, isLoading: true });
        // simulate initial Ajax
        setTimeout(() => {
            this.rData = recomList;
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.rData),
                refreshing: false,
                isLoading: false,
            });
        }, 600);
    };
    
    onEndReached = (event) => {
        // load new data
        // hasMore: from backend data, indicates whether it is the last page, here is false
        if (this.state.isLoading && !this.state.hasMore) {
            return;
        }
        console.log('reach end', event);
        // this.setState({ isLoading: true });
        // setTimeout(() => {
        //     this.rData = [...this.rData, ...genData(++pageIndex)];
        //     this.setState({
        //         dataSource: this.state.dataSource.cloneWithRows(this.rData),
        //         isLoading: false,
        //     });
        // }, 1000);
    };
    
    render() {
        const row = (rowData, sectionID, rowID) => {
            return (
                <div key={rowID}
                    style={{
                        padding: '0 15px',
                        backgroundColor: 'white',
                    }}
                    >
                    <li key={rowData.snowflakeId}>
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
                    </li>
                </div>
            );
        };
        return (
            <div className="list className="recom"">
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
                        height: this.state.height
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