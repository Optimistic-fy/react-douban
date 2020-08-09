import React from 'react'
import Swiper from 'swiper/dist/js/swiper.js'
import 'swiper/dist/css/swiper.min.css'
import { Link } from 'react-router-dom'

class WriteSwpier extends React.PureComponent{
    constructor(props){
        super(props)

        this.state = {
            date: '',
            week: ''
        }
    }

    componentDidMount(){
        new Swiper('.swiper-container', {
            spaceBetween : 20,
            slidesPerView : 'auto',
            pagination: {
                el: '.swiper-pagination',
                dynamicBullets: true,
            },
        })

        var today = new Date()
        var weekDay = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"]
        this.setState({
            date: today.getMonth() + 1 + '月' + today.getDate() + '日',
            week: weekDay[today.getDay()]
        })
    }

    render(){
        return (
            <div className="swiper-dynamic">
                <div className="title-span">
                    <p>初来豆瓣，写点什么吧...</p>
                </div>
                <div className="swiper-container">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide">
                            <div className="write begin-write">
                                <div className="write-content">
                                    <p className="date">{this.state.date}，{this.state.week}</p>
                                    <h2>开始记录</h2>
                                    <p className="record-content">
                                        这里很安静，暂时没有认识的人<br />
                                        记录此刻的心情...<br />
                                        或是印象深刻的电影、书籍、音乐<br />
                                        平凡，但重要...
                                    </p>
                                    <Link 
                                        className="write-btn"
                                        to='/write' 
                                        >
                                        <span className="iconfont">&#xe62b;</span>&nbsp;&nbsp;
                                        写点什么
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="swiper-slide">
                            <div className="write">
                                <div className="write-content">
                                    <p className="date">
                                        <span className="topic">#</span>
                                        豆瓣话题&nbsp;&nbsp;发起
                                    </p>
                                    <h2>
                                        <span className="topic">#</span>
                                        视频*漫步城市见到的魔幻时刻
                                    </h2>
                                    <p className="record-content">
                                        漫步城市街道，总有些场景会让你有种置身电影般的魔幻之感。可能是现代都市中偶现残破与古旧的安静一隅，也可能是古老巷子辅警霓虹闪烁的未来景观。历史...
                                    </p>
                                    <Link 
                                        className="write-btn"
                                        to='/write' 
                                        >
                                        <span className="iconfont">&#xe62b;</span>&nbsp;&nbsp;
                                        写点什么
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="swiper-slide">
                            <div className="write">
                            </div>
                        </div>
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
            </div>
        )
    }
}
export default WriteSwpier