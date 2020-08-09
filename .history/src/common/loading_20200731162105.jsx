import React from 'react'

class Loading extends React.PureComponent{
    render () {
        return (
            <div>
                <img src={require('@/src/images/loading.gif')} />
            </div>
        )
    }
}
export default Loading