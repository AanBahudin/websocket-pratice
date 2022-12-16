import React, { useState, useEffect } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

const Chat = ({io, socket, name, room}) => {

    const [currentMessage, setCurrentMessage] = useState('')
    const [messageList, setMessageList] = useState([])
    const time = new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()

    const sendMessage = async () => {
        if(currentMessage) {
            const messageData = {author:name, room, message: currentMessage, time}

            await socket.emit('send-message', messageData)
            setMessageList((list) => [...list, messageData]);
            setCurrentMessage("");
        }
    }
    
    useEffect(() => {
        socket.on('receive-message', (data) => {
            console.log(data);
            setMessageList((list) => [...list, data]);
        }) 
    },[socket])

    return (
        <div className="chat-window">
            <div className="chat-header">
                <p>live chat</p>
            </div>
            <div className="chat-body">
                <ScrollToBottom className="message-container">
                    {messageList.map((messageContent, index) => {
                        return (
                        <div className="message" id={name === messageContent.author ? "you" : "other"} key={index}>
                            <div>
                                <div className="message-content">
                                    <p>{messageContent.message}</p>
                                </div>
                                <div className="message-meta">
                                    <p id="time">{messageContent.time}</p>
                                    <p id="author">{messageContent.author}</p>
                                </div>
                            </div>
                    </div>
                        )
                    })}
                </ScrollToBottom>
            </div>
            <div className="chat-footer">
                <input type="text" name="message" placeholder="type message" value={currentMessage} onChange={e => setCurrentMessage(e.target.value)} onKeyPress={e => e.key === "Enter" && sendMessage()}/>
                <button onClick={sendMessage}>&#9658;</button>
            </div>
        </div>
    )
}

export default Chat