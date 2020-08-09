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
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
    
        this.state = {
            dataSource,
            refreshing: true,
            isLoading: true,
            height: document.documentElement.clientHeight
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
        this.props.getReList()
    
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
        // let index = data.length - 1;
        const row = (rowData, sectionID, rowID) => {
            // if (index < 0) {
            //     index = data.length - 1;
            // }
            // const obj = data[index--];
            return (
                <div key={rowID}
                    style={{
                        padding: '0 15px',
                        backgroundColor: 'white',
                    }}
                    >
                   {/* <div style={{ height: '50px', lineHeight: '50px', color: '#888', fontSize: '18px', borderBottom: '1px solid #ddd' }}>
                        {obj.title}
                    </div>
                    <div style={{ display: '-webkit-box', display: 'flex', padding: '15px' }}>
                        <img style={{ height: '63px', width: '63px', marginRight: '15px' }} src={obj.img} alt="" />
                        <div style={{ display: 'inline-block' }}>
                        <div style={{ marginBottom: '8px', color: '#000', fontSize: '16px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '250px' }}>{obj.des}-{rowData}</div>
                        <div style={{ fontSize: '16px' }}><span style={{ fontSize: '30px', color: '#FF6E27' }}>{rowID}</span> 元/任务</div>
                        </div>
                </div>*/}
                </div>
            );
        };
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