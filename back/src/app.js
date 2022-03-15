import express from "express"
import router from './users/users.router.js'
import cors from 'cors'
import http from 'http'
import {Server} from 'socket.io'

import usersRouter from './users/users.router.js';


const app = express()
const port = 3001
const server = http.createServer(app)

const io = new Server(server, {
    cors:{ // Llamo donde voy a abrir la aplicaion para que no salte cords
        origin:"http://localhost:3000",
        methods:["GET", "POSTS"],
    }
})

io.on('connection',(socket) => {// connection es un evento de socket
    console.log(`User connected`)

    // socket.on("send_message", (data) => {
    //    // socket.to(data.room).emit('receive_message',data)
    //     console.log(data)
    //   });

    io.emit("hello", 'hello desde back')
    socket.on("send_message", data => {
        console.log(data)
        io.emit("receive_message",data)
        console.log(data.room)
    })

    socket.on('disconnect', () => {
        console.log('User disconnected', socket.id)
    })
}) 


app.use(express.json())
app.use(express.urlencoded({extended:'utf-8'}))



app.use('/users', router)




server.listen(port,() => console.log(`Se ha iniciado en el puerto: ${port}`))
