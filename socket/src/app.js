import express from 'express'
import { Server } from 'socket.io'
import { createServer } from 'http'


/**
 * Si quiero enviar datos al cliente, usare use io para enviar a rodo el cliente
 *  -use io.emit para enviar a un cliente ej.(use io.to(socketID).emit)
 * 
 * Si quiero recibir datos del cliente --> use socket.on
 */

const app = express()
const port = 4000
const httpServer = createServer()

const io = new Server(httpServer,{
    cors:{
        origin:"http://localhost:3000/",
        methods:["GET", "POST"]
    }
})

const users = []; //Guardo los usuarios en una variable constante ya que el socket cambia constantemente


const addUser = (userId,socketId) => { // INDICO QUE SI NO EXITE EL USUARIO HAGA UN PUSH AL ARRAY DE USERS 
 !users.some((user) => user.userId === userId)&&
    users.push({ userId, socketId });
   
}

const removeUser = (socketId) => {
    users.filter(user => user?.socketId !== socketId)
    
}


io.on("connection",(socket) => {
    //CONEXION
/**ONE TO ONE PRIVATE CHAT */
    socket.on("join_chat",(room) => {
        socket.join(room)   
        console.log(`user join room ${room}`)
    })

    socket.on("addUser", (userId) => {
        addUser(userId,socket.id)
        io.emit("getUsers", users)
        console.log(users)
    })


    //ENVIO DE MENSAJE Y RECIBO MENSAJE
    socket.on("sendMessage",(data) => {
        console.log(data)
        io.to(data.conversationId).emit("getMessage",{ // ENVIAMOS EL MENSAJE AL RECEPTOR
            date:data.date,
            username:data.username,
            img:data.img,
            senderId:data.senderId,
            text:data.text,
            conversationId:data.conversationId
        })
        
    })
  
    /**GROUP CHAT */
    socket.on("join_serv",(room) => {
        socket.join(room)
        console.log(`User joined room ${room}`)
    })

    socket.on("sendServMsg", (data) => {
        io.to(data.conversationId).emit("getServMsg",{
            username:data.username,
            date:data.date,
            img:data.img,
            senderId:data.senderId,
            text:data.text
        })
    })

    //DESCONEXION
    socket.on("disconnect", () => {
        removeUser(socket.id)
        io.emit("getUsers", users)
        
    })
})

httpServer.listen(port, () => console.log(`Socket iniciado en el puerto:${port}`))