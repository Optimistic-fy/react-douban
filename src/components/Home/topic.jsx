import React from 'react'
import { 
    NavBar, 
    Icon,
    List,
    TextareaItem 
} from 'antd-mobile'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { ImagePicker, WingBlank } from 'antd-mobile'
import { changeInitialPage, getInputValue } from './store/actionCreaters'

@withRouter
@connect(
    state => state.Home,
    {changeInitialPage, getInputValue}
)

class Topic extends React.PureComponent{
    constructor(props){
        super(props)
        this.state = {
            inputText: '',
            showaddimg: false,
            files: [],
        }

        this.hadleBack = this.hadleBack.bind(this)
        this.handleRelease = this.handleRelease.bind(this)
        this.handleInput = this.handleInput.bind(this)
        this.handleCheckImg = this.handleCheckImg.bind(this)
    }
    componentDidMount() {
        this.autoFocusInst.focus();
    }

    hadleBack(){
        this.props.changeInitialPage(0)
        this.props.history.go(-1)
    }
    handleRelease(){
        this.props.changeInitialPage(1)
    }
    handleInput(e){
        this.setState({
            inputText: e
        })
        this.props.getInputValue(e)
    }
    handleCheckImg(){
        this.setState({
            showaddimg: true
        })
    }
    render(){
        const { inputvalue } = this.props
        const { files } = this.state
        return (
            <div className="write-content">
                <NavBar
                    icon={<Icon type="cross" size="md"/>}
                    onLeftClick={this.hadleBack}
                    rightContent={[
                        <Link to='/home' key="fabu" onClick={this.handleRelease}>发布</Link>
                    ]}
                    >NavBar
                </NavBar>
                <div className="little-thing">
                    <div className="head-portait">
                        {
                            inputvalue === '' ? <img src={require('../../images/head.jpg')} alt="头像"/> : ''
                        }
                        <List>
                            <TextareaItem
                                autoHeight
                                labelNumber={5}
                                ref={el => this.autoFocusInst  = el}
                                placeholder="这里很安静..."
                                value={this.state.inputText}
                                onChange={this.handleInput} 
                            />
                        </List>
                    </div>
                    <div className="button-img">
                        <WingBlank>
                            <ImagePicker
                                length="3"
                                files={files}
                                onChange={this.onChange}
                                selectable={files.length < 9}
                                multiple={true}
                            />
                        </WingBlank>
                        {/* {
                            this.state.showaddimg ? <ImagePicke /> : ''
                        }
                        <div className="img-choose">
                            <span className="iconfont" onClick={this.handleCheckImg}>&#xe60a;</span>
                        </div> */}
                    </div>
                </div>
            </div>
        )
    }
}
export default Topic