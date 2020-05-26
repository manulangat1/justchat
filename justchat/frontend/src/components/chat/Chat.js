import React from 'react'
import WebSocketInstance from '../../websocket'
import '../../styles/main.scss'
class Chat extends React.Component{
    user = "manulangat"
    constructor(props){
        super(props)
        this.state = {
            messages:[],
            message:''
        }
        this.waitForSocketConnection(() => {
            WebSocketInstance.addCallbacks(this.setMessages.bind(this),
            this.addMessage.bind(this),
            WebSocketInstance.fetchMessages(this.props.currentUser)
            )
        })
    }
    onSubmit = e => {
        e.preventDefault()
        const message = {
            from:'manulangat',
            content:this.state.message
        }
        WebSocketInstance.newChatMessage(message)
        this.setState({
            message:''
        })
    }
    onChange = e =>{
        this.setState({[e.target.name]:e.target.value})
    }
    waitForSocketConnection(callback){
        const component = this
        const recursion = this.waitForSocketConnection
        setTimeout(
            function(){
                if(WebSocketInstance.state() === 1){
                    console.log('con sec')
                    callback()
                    return 
                } else{
                    console.log('waiting for con')
                    // recursion(callback)
                    component.waitForSocketConnection(callback)
                }
            },100
        )
    }
    setMessages(messages){
        this.setState({messages:messages.reverse()});
    }
    addMessage(message){
        this.setState({
            messages:[...this.state.messages,message]
        })
    }
    renderMessages = (messages) => {
        const currentUser = 'manulangat'
        return messages.map(message => (
            <li key={message.id} className={message.author === currentUser ? 'sent': 'replies'}>
                <p>{message.content}</p>
            </li>
        ))

    }
    render(){
        const {messages,message } = this.state
        return(
            <section>
                <h1>p</h1>
                <ul>
                    {
                        messages && 
                        this.renderMessages(messages)
                    }
                </ul>
                <form onSubmit={this.onSubmit}>
                    <input type="text" onChange={this.onChange} value={message} name="message"/>
                </form>
            </section>
        )
    }
}
export default Chat