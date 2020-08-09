import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Swiper from 'swiper/dist/js/swiper.js'
import 'swiper/dist/css/swiper.min.css'
import '../../static/css/preview.less'
preView
// import Transition from 'react-transition-group/Transition'

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
        this.props.history.push('/home')
    }
    componentDidMount(){
        new Swiper('.swiper-container', {
            spaceBetween : 20,
            slidesPerView : 'auto',
            pagination: {
                el: '.swiper-pagination',
                dynamicBullets: true,
                type: 'fraction',
                renderFraction: function (currentClass, totalClass) {
                  return '<span class="' + currentClass + '"></span>' +
                         ' / ' +
                         '<span class="' + totalClass + '"></span>';
                },
            }
        })
    }
    render () {
        const { imglist } = this.props
        return (
                imglist ? imglist.map((image, index) => {
                    return (
                        <li onClick={this.handleClickPicture} key={index}>
                            <img src={image} alt=""/>
                        </li>
                    )
            }) : null
        )
    }
}

export default Preview