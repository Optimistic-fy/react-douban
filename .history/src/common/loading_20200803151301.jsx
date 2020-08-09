import React from 'react'
import '../static/css/loading.less'

class Loading extends React.PureComponent{
    render () {
        return (
            <div>
                <img src={require('../images/loading.gif')} alt="loading" />
            </div>
        )
    }
}
export default Loading