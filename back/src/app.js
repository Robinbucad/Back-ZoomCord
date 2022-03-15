import express from "express"
import router from './users/users.router.js'
import cors from 'cors'




const app = express()
const port = 4000

app.use(express.json())
app.use(express.urlencoded({extended:'utf-8'}))
app.use(cors())


app.use('/users', router)

app.listen(port,() => console.log(`Se ha iniciado en el puerto: ${port}`))