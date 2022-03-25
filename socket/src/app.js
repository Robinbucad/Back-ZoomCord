import express from 'express'
import { Server } from 'socket.io'
import { createServer } from 'http'
import cors from 'cors'


/**
 * Si quiero enviar datos al cliente, usare use io para enviar a rodo el cliente
 *  -use io.emit para enviar a un cliente ej.(use io.to(socketID).emit)
 * 
 * Si quiero recibir datos del cliente --> use socket.on
 */

const app = express()
app.use(cors())
const port = 4000
const httpServer = createServer()

const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000/",
        methods: ["GET", "POST"]
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

//PERSISTER EN UNA COLECCION

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

    socket.on("sendNotification", ({ senderName, receiverName }) => {

        const receiver = getUser(receiverName)
    
         io.to(receiver.socketId).emit("getNotification",{
             senderName:senderName
         })
    })

 
    //ENVIO DE MENSAJE Y RECIBO MENSAJE
    socket.on("sendMessage", (data) => {

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

httpServer.listen(port, () => console.log(`Socket iniciado en el puerto:${port}`))