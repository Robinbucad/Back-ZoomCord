import express from "express"
import {} from "dotenv/config";
import cors from 'cors'
import http from 'http'
import {Server} from 'socket.io'
import authRouter from './auth/auth.router.js'
import userRouter from './users/users.router.js'
import { validateAuth } from "./auth/auth.middleware.js"
import conversationRouter from './conversation/conversation.routes.js'
import messagesRouter from './message/messages.routes.js'
import serverRouter from './servers/servers.router.js'
import serverMessages from './messageServer/messageServer.router.js'
import publications from './publicaciones/pub.router.js'
import notificationsRouter from './notifications/notifications.router.js'




const app = express()
const port = process.env.PORT || 3001
const server = http.createServer(app)
app.use(cors())


const io = new Server(server, {
    cors:{ // Llamo donde voy a abrir la aplicaion para que no salte cords
        origin:"http://localhost:3000",
        methods:["GET", "POSTS"],
    }
})

let users = []; //Guardo los usuarios en una variable constante ya que el socket cambia constantemente


const addUser = (userId, socketId) => { // INDICO QUE SI NO EXITE EL USUARIO HAGA UN PUSH AL ARRAY DE USERS 
    
    !users.some((user) => user.userId === userId) &&
        users.push({ userId, socketId });
}

const removeUser = (socketId) => {
    users.filter(user => user?.socketId !== socketId)
}

const getUser = (userId) => {

    return users.find(user => user.userId === userId)
}

io.on("connection", (socket) => {
    //CONEXION
    /**ONE TO ONE PRIVATE CHAT  -> ME guio para ver quien entra a una sala*/
    socket.on("join_chat", (room) => {
        socket.join(room)
        console.log(`user join room ${room}`)
    })

    socket.emit("me", socket.id);

    //FUNCION QUE NO LE ESTOY DANDO DE MOMENTO FUNCIONALIDAD, EN UN FUTURO TENIA PENSADO VER QUIEN ESTA ONLINE

    socket.on("addUser", (userId) => {
        addUser(userId, socket.id)
        io.emit("getUsers", users)
    
    })


 
    //ENVIO DE MENSAJE Y RECIBO MENSAJE
    socket.on("sendMessage", (data) => {
        console.log(data)
        // Esto me lo envia las veces de la longitud del array de mensajes
        io.to(data.conversationId).emit("getMessage", { // ENVIAMOS EL MENSAJE AL RECEPTOR
            date: data.date,
            username: data.username,
            file: data.file,
            senderId: data.senderId,
            text: data.text,
            conversationId: data.conversationId
        })
    })

    /**GROUP CHAT */
    socket.on("join_serv", (room) => {
        socket.join(room)
        console.log(`User joined room ${room}`)

    })

    socket.on("sendServMsg", (data) => {
        io.to(data.conversationId).emit("getServMsg", {
            username: data.username,
            date: data.date,
            file: data.file,
            senderId: data.senderId,
            text: data.text
        })
    })


    socket.on("callUser", ({ userToCall, signalData, from, name }) => {
        io.to(userToCall).emit("callUser", { signal: signalData, from, name });
    });

    socket.on("answerCall", (data) => {
        io.to(data.to).emit("callAccepted", data.signal)
    });

    // socket.on("shareScreen", (data) => {
    //     console.log(data)
    // })

    //DESCONEXION
    socket.on("disconnect", () => {
        removeUser(socket.id)
        io.emit("getUsers", users)
        socket.broadcast.emit("callEnded")

    })



})


app.use(express.json())
app.use(express.urlencoded({extended:'utf-8'}))

app.use('/auth', authRouter);
app.use('/users', validateAuth, userRouter)
app.use('/conversation',validateAuth,conversationRouter)
app.use('/message',validateAuth, messagesRouter)
app.use('/servers',serverRouter)
app.use('/servMsg', validateAuth, serverMessages)
app.use('/publications',validateAuth,publications)
app.use('/notifications', validateAuth ,notificationsRouter)

app.use('/static',express.static('public-static'))   




server.listen(port,() => console.log(`Se ha iniciado en el puerto: ${port}`))
