import express from 'express'
import { Server } from 'socket.io'
import http from 'http'

/**
 * Si quiero enviar datos al cliente, usare use io para enviar a rodo el cliente
 *  -use io.emit para enviar a un cliente ej.(use io.to(socketID).emit)
 * 
 * Si quiero recibir datos del cliente --> use socket.on
 */

const app = express()
const port = 4000
const server = http.createServer(app)

const io = new Server(server,{
    cors:{
        origin:"http://localhost:3000"
    }
})

let users = []; //Guardo los usuarios en una variable constante ya que el socket cambia constantemente

const addUser = (userId,socketId) => { // INDICO QUE SI NO EXITE EL USUARIO HAGA UN PUSH AL ARRAY DE USERS
    !users.some((user) => user.userId === userId) &&
        users.push({userId,socketId})
}

const removeUser = (socketId) => {
    users.filter(user => user.socketId !== socketId)

}

const getUser = (userId) => { // ESTA FUNCION ME BUSCA EL USUARIO QUE TENGA EL MISMO ID QUE EN EL ARRAY DE USUARIOS,
   return users.find(user => user.userId === userId)
}

io.on("connection",(socket) => {
    //CONEXION
    console.log("Usuario conectado.")
    console.log(`Se ha conectado usuario en el socket :${socket.id}`)
    socket.on("addUser", userId => {
        addUser(userId,socket?.id)
        io.emit("getUsers", users)
        
    })

    //ENVIO DE MENSAJE Y RECIBO MENSAJE
    socket.on("sendMessage",({senderId,receiverId,text}) => {
        const user = getUser(receiverId); //BUSCO EL USUARIO
        io.to(user.socketId).emit("getMessage",{ // ENVIAMOS EL MENSAJE AL RECEPTOR
            senderId,
            text,
        })
    })

    //DESCONEXION
    socket.on("disconnect", () => {
        console.log("Usuario desconectado")
        removeUser(socket.id)
        io.emit("getUsers", users)
    })
})

server.listen(port, () => console.log(`Socket iniciado en el puerto:${port}`))