import React, {useState, useEffect} from "react"
import { io } from "socket.io-client"

const socket = io.connect('http://localhost:3001')

const PrivateChat = () => {

    const [message, setMessage] = useState('')
    const [reply, setReply] = useState('')


    const sendMessage = async () => {
        if(message) {
            await socket.emit('send_message', message)
        }
    }

    useEffect(() => {

        socket.on('retrive_message', data => {
            setReply(data)
            console.log(data);
        })
        // eslint-disable-next-line
    }, [socket])

    return (
        <section className="w-[90%] mx-auto bg-teal-400 min-h-[100vh] h-fit flex justify-center items-center flex-col">
            <h1 className="text-white font-semibold font-sans text-3xl uppercase">Message</h1>
            <h1 className="text-slate-600 font-semibold font-sans text-md">{socket.id}</h1>
            
            <div className="flex gap-x-4 my-[2%]">
                <input className="px-3 py-1 rounded ring-0 outline-none placeholder:text-slate-400 placeholder:uppercase focus:placeholder:text-transparent duration-200" placeholder="message..." type='text' value={message} onChange={e => setMessage(e.target.value)} />
                <button onClick={sendMessage} className="px-5 py-2 bg-white rounded uppercase hover:bg-teal-400 hover:border-white border-[1px] hover:text-white text-slate-400 duration-200 font-semibold">Send</button>
            </div>

            <h1>{reply ? reply : null}</h1>

        </section>
    )
}

export default PrivateChat