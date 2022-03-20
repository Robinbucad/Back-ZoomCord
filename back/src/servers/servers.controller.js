
import { ObjectId } from "mongodb"
import { retreiveUsersById, retrieveUsers } from "../users/users.model.js"
import { createServer, pushMemberSever, retrieveServerById, retrieveServerByUser, retrieveServers } from "./servers.model.js"


export const serversCtrl = async(req,res) => {
    const servers =await retrieveServers()
    console.log(servers)
    res.json(servers)
    
}

export const createServerCtrl = async (req,res) => {
    const server = {
        name:req.body.name,
        img:req.body.img,
        members:[req.body.userId]
    }
    await createServer(server)
    res.status(201).json(server)
}

export const getServerById = async(req,res) => {
    const  {id} = req.params
    const server = await retrieveServerById(id)

    if(server !== undefined)res.json(server)

}

export const getServConversationByIdCtrl = async(req,res) =>{
    const {id} = req.params
    
    const conv = await  retrieveServerByUser(id)
    if(conv !== undefined)res.json(conv)
    else res.sendStatus(404)
}



export const pushMemberCtrl = async (req,res) => {
    const {id} = req.params
    const {userId} = req.body


    const members =await retrieveServerById(id)
    console.log(members)
    const checkMembers = (members.members.some(e => e === userId)) //VERIFICO SI EL USUARIO EXISTE EN EL SERVIDOR
    if(!checkMembers){
        pushMemberSever(id,userId)
        res.json(userId)
    }
    else  res.sendStatus(409)
   
}