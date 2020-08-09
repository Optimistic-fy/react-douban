import React from 'react'
import TabBar from '../../common/tabBar'
import { PullToRefresh, Button } from 'antd-mobile';

function genData() {
  const dataArr = [];
  for (let i = 0; i < 20; i++) {
    dataArr.push(i);
  }
  return dataArr;
}

class Movie extends React.PureComponent{
    render(){
        return (
            <div>
                <div>Movie</div>
                <TabBar />
            </div>
        )
    }
}
export default Movie