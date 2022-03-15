import express from "express"
//import router from './users/users.router.js'
import cors from 'cors'
//import routerAuth from './auth/auth.route.js'

import conversationRoute from './routes/conversation.js'
import messageRoute from './routes/message.js'


const app = express()
const port = 4000

app.use(express.json())
app.use(express.urlencoded({extended:'utf-8'}))
app.use(cors())


//app.use('/users', router)
//app.use('/auth', routerAuth)
app.use('/conversation', conversationRoute)
app.use('message',messageRoute)


app.listen(port,() => console.log(`Se ha iniciado en el puerto: ${port}`))