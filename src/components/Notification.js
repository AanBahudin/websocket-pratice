import { io } from 'socket.io-client'
import React, {useEffect, useState} from 'react'
import {
    Alert,
    AlertIcon,
  } from '@chakra-ui/react'


const socket = io.connect('http://localhost:3001')

const Nofification = () => {

    const [status, setStatus] = useState(false)

    const handleNotication = () => {
        socket.emit('send_notif', !status)
    }


    useEffect(() => {
        socket.on('notif_status', data => {
            setTimeout(() => {
                setStatus(false)
            }, 2000)
        })
    }, [socket])

    return (
        <section className="w-[90%] mx-auto bg-cyan-400 flex justify-center items-center flex-col gap-y-8 p-10">
            <h1 className="text-center font-sans font-bold text-white text-3xl uppercase">Notif check</h1>
            <button onClick={handleNotication} className='py-2 px-4 rounded text-cyan-500 hover:drop-shadow-xl bg-white'>Handle Notif</button>


            {status ? (
                <Alert status='success' className='absolute z-50'>
                    <AlertIcon />
                    Data uploaded to the server. Fire on!
                </Alert>
            ) : null}
                
        </section>
    )
}

export default Nofification