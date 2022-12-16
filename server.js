const express = require('express')
const app = express()
const http = require('http')
const {Server} = require('socket.io')
const cors = require('cors')

app.use(cors())

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: ['http://localhost:3000'],
        methods: ['GET', "POST"]
    }
})

// io.on("connection", socket => {
//     console.log(`User Connected : ${socket.id}`)

//     socket.on('join-room', (data) => {
//         socket.join(data)
//         console.log(`user with id ${socket.id} enter room : ${data}`);
//     })

//     socket.on('send-message', (data) => {
//         console.log(data);
//         socket.to(data.room).emit('receive-message', data)
//     })

//     socket.on('disconnect', () => {
//         console.log(`User Disconnected : ${socket.id}`)
//     })
// })

    // io.on('connect', socket => {
    //     console.log(`user connected : ${socket.id}`)

    //     socket.on('send_notif', data => {
    //         socket.emit('notif_status', data)
    //     })


    //     socket.on('disconnect', () => {
    //         console.log(`User Disconnected : ${socket.id}`)
    //     })
    // })


    io.on('connect', socket => {
        console.log(`user connected with id : ${socket.id}`);

        socket.on('send_message', data => {
            socket.emit('retrive_message', data)
        })

        socket.on('disconnect', () => {
            console.log(`User Disconnected : ${socket.id}`);
        })
    })


server.listen(3001, () => {
    console.log(`server is running on PORT ${3001}`)
})