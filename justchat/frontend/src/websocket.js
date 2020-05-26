
class WebSocketService{
    static instance = null
    callbacks = {}
    static getInstance(){
        if (!WebSocketService.instance){
            WebSocketService.instance = new WebSocketService
        }
        return WebSocketService.instance
    }
    constructor(){
        this.socketRef = null;
    }

    connect(){
        const path = "ws://127.0.0.1:8000/ws/chat/manu/"
        this.socketRef = new WebSocket(path)
        this.socketRef.onopen = () => {
            console.log('web open')
        }
        this.socketNewMessage(JSON.stringify({
            command:'messages'
        }))
        this.socketRef.onmessage = e => {
            // sending a message
            this.socketNewMessage(e.data)
            console.log(e.data)
        }
        this.socketRef.onerror = e => {
            console.log(e.message)
        }
        this.socketRef.onclose = () => {
            console.log('websocket close')
            this.connect();
        }
    }
    socketNewMessage(data){
        const parseData = JSON.parse(data)
        const command = parseData.command
        if (Object.keys(this.callbacks).length === 0){
            return;
        }
        if (command === 'messages'){
            this.callbacks[command](parseData.messages)
        }
        if (command === 'new_message'){
            this.callbacks[command](parseData.message)
        }
    }
    fetchMessages(username){
        this.sendMessage({command:'messages',username:username})
    }
    newChatMessage(message){
        this.sendMessage({command:'new_message',from:message.from,message:message.content})
    }
    addCallbacks(messagesCallback,newMessageCallback){
        this.callbacks['messages'] = messagesCallback
        this.callbacks['new_message'] = newMessageCallback
    }
    sendMessage(data){
        try{
            this.socketRef.send(JSON.stringify({
                ...data
            }))
        } catch{
            console.log(err.message)
        }
    }
    // state(){
    //     return this.socketRef.readyState;
    // }
    waitForSocketConnection(callback){
        const socket = this.socketRef
        const recursion = this.waitForSocketConnection
        setTimeout(
            function(){
                if(socket.readyState === 1){
                    console.log('con sec')
                    if (callback != null){
                        callback()
                    }
                    return 
                } else{
                    console.log('waiting for con')
                    recursion(callback)
                }
            },1
        )
    }
    state() {
        return this.socketRef.readyState;
      }
}
const WebSocketInstance = WebSocketService.getInstance()
export default WebSocketInstance