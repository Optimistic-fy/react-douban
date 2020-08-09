import React from 'react'
import { NavBar, Icon } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

@withRouter
@connect(
    state => state.Home
)

class Header extends React.PureComponent{
    constructor(props){
        super(props)

        this.handleBack = this.handleBack.bind(this)
    }
    handleBack(){
        this.props.history.push('/home')
    }
    render(){
        return(
            <div className="back-head" style={{position:'fixed', left:'0', right:'0', zIndex:'2'}}>
                <NavBar 
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={ this.handleBack }
                ></NavBar>
            </div>
        )
    }
}

export default Header