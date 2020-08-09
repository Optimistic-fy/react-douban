import React from 'react'
import { NavBar, List, InputItem } from 'antd-mobile'
import '../static/css/search.less'

class Search extends React.PureComponent{
    constructor(props){
        super(props)

        this.handleClick = this.handleClick.bind(this)
    }
    handleClick(){
        console.log('获取焦点')
    }
    render(){
        return (
            <div>
                <NavBar mode="light">
                    <List>
                        <i className="iconfont">&#xe60e;</i>
                        <InputItem 
                            placeholder="输入搜索内容" 
                            onFocus={this.handleClick}
                        />
                        <i className='iconfont email'>&#xe69d;</i>
                    </List>
                </NavBar>
            </div>
        )
    }
}
export default Search