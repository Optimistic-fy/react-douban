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

// const data = [
//   {
//     img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
//     title: 'Meet hotel',
//     des: '不是所有的兼职汪都需要风吹日晒',
//   },
//   {
//     img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
//     title: 'McDonald\'s invites you',
//     des: '不是所有的兼职汪都需要风吹日晒',
//   },
//   {
//     img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
//     title: 'Eat the week',
//     des: '不是所有的兼职汪都需要风吹日晒',
//   },
// ];
// const NUM_ROWS = 20;
// let pageIndex = 0;

// function genData(pIndex = 0) {
//     const dataArr = [];
//     for (let i = 0; i < NUM_ROWS; i++) {
//         dataArr.push(`row - ${(pIndex * NUM_ROWS) + i}`);
//     }
//     return dataArr;
// }

class Team extends React.PureComponent{
    constructor(props) {
        super(props);
        this.state = {
            dataSource:'',
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
        return (
            <div className="list">
                <ListView
                    key={'1'}
                    ref={el => this.lv = el}
                    dataSource={this.state.dataSource}
                    renderFooter={() => (
                        <div style={{ padding: 30, textAlign: 'center' }}>
                            {this.state.isLoading ? 'Loading...' : 'Loaded'}
                        </div>
                    )}
                    style={{
                        height: this.state.height
                    }}
                    pullToRefresh={<PullToRefresh refreshing={this.state.refreshing} onRefresh={this.onRefresh}/>}
                    onEndReached={this.onEndReached}
                    pageSize={10}
                >
                    1111
                </ListView>
            </div>
        );
    }
}
export default Team