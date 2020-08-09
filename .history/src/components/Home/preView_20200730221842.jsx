import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Swiper from 'swiper/dist/js/swiper.js'
import 'swiper/dist/css/swiper.min.css'
import '../../static/css/preview.less'
import ReactDOM from 'react-dom'

@withRouter
@connect(
    state => state.Home
)

class Preview extends React.PureComponent{
    constructor(props){
        super(props)

        this.handleClosePic = this.handleClosePic.bind(this)
    }
    handleClosePic(){
        this.props.parent.setPriview(this, {show: false})
    }
    componentDidMount(){
        new Swiper('.swiper-container', {
            spaceBetween : 20,
            slidesPerView: 'auto',
            initialSlide: this.props.imgIndex,  //设置初始化时slide的索引
            pagination: {
                el: '.swiper-pagination',
                dynamicBullets: true,
                type: 'fraction',  //分页器类型
            }
        })
    }
    render () {
        const { imgList } = this.props

        return ReactDOM.createPortal(
            // <div>
            //     <div className="preview" >
            //         <div className="swiper-container">
            //             <div className="swiper-wrapper">
            //                 {imgList ? imgList.map((image, indx) => {
            //                     return (
            //                         <div key={indx} className="swiper-slide" onClick={this.handleClosePic}>
            //                             <img src={image} alt="" />
            //                         </div>
            //                         )
            //                 }) : null}
            //             </div>
            //             <div className="swiper-pagination"></div>
            //         </div>
            //     </div>
            // </div>  
        )
    }
}

export default Preview