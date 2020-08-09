import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import '../../static/css/recommond.less'
import { getReList } from './store/actionCreaters'
import {  ListView } from 'antd-mobile';

@withRouter
@connect(
    state => state.Home,
    {getReList}
)

class Recommond extends React.PureComponent{
    constructor(props){
        super(props)
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        this.state = ({
            search: {
                hotDegree: 20,
                offset: 0,
                pageSize: 10
            },
            isLoading: true,  //s是否加载中
            isHasMore: false, //是否还有更多数据
            dataSource
        })

        this.handleClickPicture = this.handleClickPicture.bind(this)
        this.handleScrolll = this.handleScrolll.bind(this);
        this.onEndReached = this.onEndReached.bind(this);
    }

    componentDidMount(){
        document.getElementById('recList').scrollTop = sessionStorage.getItem('posit')
        this.props.getReList(this.state.search)
    }

    handleScrolll() {
        let top = this.scrollheight.scrollTop
        sessionStorage.setItem('posit', top)
    }

    handleClickPicture(){
        this.props.history.push('/preview')
    }

    onEndReached () {
        const {page,row,totalPage,isLoading,isHasMore} =  this.state
         
        //当前已加载的条数小于total总条数 请求下一页数据，否则停止请求数据
        if((Number(page)-1) < Number(totalPage)){
            this.setState({
                isLoading: true
            })
            this.getBatchData()
        }else{
            this.setState({
                isLoading:false,
                isHasMore:false
            })
        }
    }

    render () {
        const { recomList } = this.props
        const row = (rowData, sectionID, rowID) => {
            return(
                <div>
                  <div>{rowData.username}</div>
                  <div>{rowData.billNo}</div>
                  ...
                </div>
            )
        }　　
        return(
            <div className="recom" id="recList" ref={c => this.scrollheight = c} onScrollCapture={() => this.handleScrolll()}>
                <ListView
                    ref={el => this.lv = el}
                    dataSource={this.state.dataSource}
                    renderHeader={() => <span>Pull to refresh</span>}
                    renderFooter={() => (
                        <div style={{ padding: 30, textAlign: 'center' }}>
                            {this.state.isLoading ? 'Loading...' : 'Loaded'}
                        </div>
                    )}
                    renderRow={row}
                    style={{
                        height: '100%',
                        overflow: 'auto',
                    }}
                    onEndReachedThreshold={10}
                    onEndReached={this.onEndReached}
                    pageSize={10}
                />
            </div>
        )
    }
}

export default Recommond