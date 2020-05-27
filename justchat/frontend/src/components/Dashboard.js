import React from 'react'
import Chat from './chat/Chat'
import Sidepanel from './chat/Sidepanel'
import '../styles/main.scss'
import Home from './chat/Home'
import WebSocketInstance from '../websocket'
class Dashboard extends React.Component{
    componentDidMount(){
        // WebSocketInstance.connect()
    }
    render(){
        return(
            <main className="container">
                <div className="grid">
                {/* <Sidepanel /> */}
                {/* <Home /> */}
                <Chat />
                </div>
            </main>
        )
    }
}
export default Dashboard