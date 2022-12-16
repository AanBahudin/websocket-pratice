import React, { useState } from 'react'
import {Chat} from '../components';
import { io } from 'socket.io-client';

const socket = io.connect('http://localhost:3001')

const ChatHome = () => {

    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    const [showChat, setShowChat] = useState(false)
  
    const joinRoom = () => {
      if(name && room) {
        socket.emit('join-room', room)
        setShowChat(true)
      }
    }

    return (
        <section className="App">
        <div className='joinChatContainer'>
          <h3>Join Chat</h3>
          <input type='text' placeholder='Name' value={name} onChange={e => setName(e.target.value)} />
          <input type='text' placeholder="room" value={room} onChange={e => setRoom(e.target.value)} />

          <button onClick={joinRoom} className='px-3 py-2'>Join A Room</button>
        </div>

      <Chat socket={socket} io={io}  name={name} room={room} />
    </section> 
    )
}

export default ChatHome