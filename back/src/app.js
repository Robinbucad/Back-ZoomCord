import express from "express"
import {fstat, readFileSync, writeFileSync} from 'fs'
import fs from 'fs/promises'
import cors from 'cors'
import { v4 as uuid } from 'uuid'

const app = express()
const port = 4000

app.use(express.json())
app.use(express.urlencoded({extended:'utf-8'}))
app.use(cors())

const USER_PATH = './data/users.json'

const users = JSON.parse(readFileSync(USER_PATH, {encoding:'utf-8'}))

app.get('/users', (req,res) => {
    
    res.json(users)
})

app.post('/users', (req,res) => {

    users.push({
        id:uuid(),
        email:req.body.email,
        username:req.body.username,
        password:req.body.password,
        date:req.body.date
    })
   
    writeFileSync(USER_PATH, JSON.stringify(users,null,2))
    res.json(users)

})

app.get('/users/:id',async (req,res) => {
    const filter = await users.find(e => e.id === req.params.id)
    res.json(filter)
})

app.listen(port, () => {
    console.log(`Se esta iniciando en el puerto : ${port}`)
})