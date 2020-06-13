import React from 'react'
import WebSocketInstance from '../../websocket'
import '../../styles/main.scss'
import Sidepanel from './Sidepanel'
import { connect } from 'react-redux'
class Chat extends React.Component{
    user = "manulangat"
    state = {
        messages:[],
        message:''
    }
    initialiseChat(){
        if (this.props.user){
            this.waitForSocketConnection(() => {
                WebSocketInstance.addCallbacks(this.setMessages.bind(this),
                this.addMessage.bind(this),
                WebSocketInstance.fetchMessages(this.props.user.username,this.props.match.params.chatID)
                )
            })
            // WebSocketInstance.connect(this.props.match.params.chatID)
        }
    }
    constructor(props){
        super(props)
        this.initialiseChat()
        }
    componentWillReceiveProps(newProps){
    //    if (this.props.match.params.chatID !== newProps.match.params.chatID ){
    //        WebSocketInstance.disconnect()
    //        console.log("new",newProps)
    //     this.initialiseChat()
    //     //    this.waitForSocketConnection(() => {
    //     //     WebSocketInstance.addCallbacks(this.setMessages.bind(this),
    //     //     this.addMessage.bind(this),
    //     //     WebSocketInstance.fetchMessages(this.props.user.username,this.props.match.params.chatID)
    //     //     )
    //     // })
    //    }
        console.log("new",newProps)
        this.initialiseChat()
    }
    componentDidMount(){
        console.log(this.props.user.username)
    }
    onSubmit = e => {
        e.preventDefault()
        console.log(this.props.user.username)
        const { user} = this.props.user.username
        const message = {
            from:this.props.user.username,
            content:this.state.message,
            chatId:this.props.match.params.chatID
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
    renderTimestamp = timestamp => {
        let prefix = "";
        const timeDiff = Math.round(
          (new Date().getTime() - new Date(timestamp).getTime()) / 60000
        );
        if (timeDiff < 1) {
          // less than one minute ago
          prefix = "just now...";
        } else if (timeDiff < 60 && timeDiff > 1) {
          // less than sixty minutes ago
          prefix = `${timeDiff} minutes ago`;
        } else if (timeDiff < 24 * 60 && timeDiff > 60) {
          // less than 24 hours ago
          prefix = `${Math.round(timeDiff / 60)} hours ago`;
        } else if (timeDiff < 31 * 24 * 60 && timeDiff > 24 * 60) {
          // less than 7 days ago
          prefix = `${Math.round(timeDiff / (60 * 24))} days ago`;
        } else {
          prefix = `${new Date(timestamp)}`;
        }
        return prefix;
      };
    renderMessages = (messages) => {
        const currentUser = 'manulangat'
        return messages.map(message => (
            <li key={message.id} className={message.author === this.props.user.username ? 'sent': 'replies'}>
                <p>{message.content}</p>
                <br />
                {this.renderTimestamp(message.timestamp)}
            </li>
        ))

    }
    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
      };
    
      componentDidMount() {
        this.scrollToBottom();
      }
    
      componentDidUpdate() {
        this.scrollToBottom();
      } 
    render(){
        const {messages,message } = this.state
        return(
            <section id="chat">
                <div className="container">
                    <div className="grid">
                        <Sidepanel />
                        <div>
                <ul>
                    {
                        messages && 
                        this.renderMessages(messages)
                    }
                 <div
              style={{ float: "left", clear: "both" }}
              ref={el => {
                this.messagesEnd = el;
              }}
            />
                </ul>
                {
                    messages ? (
                        <form onSubmit={this.onSubmit} className="form">
                    <input type="text"  className="form-control" onChange={this.onChange} value={message} name="message"/>
                </form>
                    )   : ''
                }
                
                </div>
                </div>
                </div>
            </section>
        )
    }
}
const mapStateToProps = state => ({
    user:state.auth.user
})
export default connect(mapStateToProps,null)(Chat)