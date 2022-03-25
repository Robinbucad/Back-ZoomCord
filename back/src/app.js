import express from "express"
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
import notificationsMsg from './notificationMsg/notificationMsg.router.js'
import notificationsRouter from './notifications/notifications.router.js'


const app = express()
const port = 3001
const server = http.createServer(app)
app.use(cors())


const io = new Server(server, {
    cors:{ // Llamo donde voy a abrir la aplicaion para que no salte cords
        origin:"http://localhost:3000",
        methods:["GET", "POSTS"],
    }
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
app.use('/notMsg', validateAuth ,notificationsMsg)

app.use('/static',express.static('public-static'))   




server.listen(port,() => console.log(`Se ha iniciado en el puerto: ${port}`))
