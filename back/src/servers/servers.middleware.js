import { retrieveServerById, retrieveServers } from "./servers.model.js"


export const validateDelServMiddleware =async (req,res,next) => {
    const {id} = req.params
    const server =await retrieveServerById(id)

    const admin = server.admin
    const servName = server.name
    if(servName === req.body.name && admin === req.body.userId){
        res.status(200)
        next()
    }else{
        res.sendStatus(409)
        console.log('na')
    }
}

export const validateUpdateNameServMiddleware =async (req,res,next) => {
    const {id} = req.params
    const server =await retrieveServerById(id)
    const admin = server.admin
    if(admin === req.body.userId){
        res.status(200)
        next()
    }else{
        res.sendStatus(409)
        console.log('na')
    }
}

