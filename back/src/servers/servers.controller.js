
import { createServer, retrieveServers } from "./servers.model.js"


export const serversCtrl = async(req,res) => {
    const servers =await retrieveServers()
    console.log(servers)
    res.json(servers)
    
}

export const createServerCtrl = async (req,res) => {
    const server = {
        ...req.body,
    }
    await createServer(server)
    res.status(201).json(server)
}
