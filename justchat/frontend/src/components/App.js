import React from 'react'
import ReactDOM from 'react-dom'
import Chat from './chat/Chat'
import Sidepanel from './chat/Sidepanel'
import '../styles/main.scss'
import WebSocketInstance from '../websocket'
class App extends React.Component{
    componentDidMount(){
        WebSocketInstance.connect()
    }
    render(){
        return(
            <main >
                <div className="grid">
                <Sidepanel />
                <Chat />
                
                </div>
            </main>
        )
    }
}
ReactDOM.render(<App />,document.getElementById('app'))