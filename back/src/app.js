import express from "express"
import cors from 'cors'
import http from 'http'
import {Server} from 'socket.io'
import authRouter from './auth/auth.router.js'
import userRouter from './users/users.router.js'
import { validateAuth } from "./auth/auth.middleware.js"



const app = express()
const port = 3001
const server = http.createServer(app)
app.use(cors())

/*
const io = new Server(server, {
    cors:{ // Llamo donde voy a abrir la aplicaion para que no salte cords
        origin:"http://localhost:3000",
        methods:["GET", "POSTS"],
    }
})

io.on('connection',(socket) => {// connection es un evento de socket
    console.log(`User connected`)

    socket.on("send_message", data => {
        console.log(data)
        io.emit("receive_message",data)
        console.log(data.room)
    })

    socket.on('disconnect', () => {
        console.log('User disconnected', socket.id)
    })
}) 

*/

app.use(express.json())
app.use(express.urlencoded({extended:'utf-8'}))

app.use('/auth', authRouter);
app.use('/users', validateAuth, userRouter)


// HACEMOS PRIMERO REGISTER(POST), VALIDATE(GET), LOGIN(POST), GET USERS(GET)



server.listen(port,() => console.log(`Se ha iniciado en el puerto: ${port}`))
