import React from "react";
import { Launcher } from 'react-chat-window'
import io from 'socket.io-client';

class ChatBotRobot extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            messageList: [],
            socket: io(),
            //socket: io("http://localhost:3000"), // to run on local device
            room: "user1",
        }

    }

    UNSAFE_componentWillMount() {
        this._sendMessage("Hello! Welcome to 'LOYA Salone'. I am your personal assistant and I will help you choose a hairstyle.Would you like to see what can I do?Type 'start' to get started. !");
    }

    componentDidMount() {
        this.state.socket.connect(true);
        this.state.socket.emit('join', this.state.room);

        this.state.socket.on("send-msg-response", async (msg) => {
            this.state.messageList.pop();
            await this.setState({
                messageList: [...this.state.messageList]
            })

            this._sendMessage(msg);
        })

    }

    async _onMessageWasSent(message) {
        await this.setState({
            messageList: [...this.state.messageList, message]
        })

        this._sendMessage("••••");
        console.log(message.data.text);
        await this.state.socket.emit('new-msg', { msg: message.data.text, room: this.state.room })

    }

    _sendMessage(text) {
        if (text.length > 0) {
            this.setState({
                messageList: [...this.state.messageList, {
                    author: 'them',
                    type: 'text',
                    data: { text }
                },]
            })
        }
    }

    render() {

        return (
            <div id="chatbox" className="chatbox">
                <Launcher
                    agentProfile={{
                        teamName: 'LOYA Salone',
                        image: 'https://cdn-icons-png.flaticon.com/512/4712/4712109.png'
                    }}
                    onMessageWasSent={this._onMessageWasSent.bind(this)}
                    messageList={this.state.messageList}
                    showEmoji
                />
            </div>
        );
    }
}

export default ChatBotRobot;