import { retreiveUsersById, retrieveUsers } from "../users/users.model.js"
import { createConv, retreiveConversationById, retrieveConv } from "./conversation.model.js"


// Controlador que manda el body del mensaje
// receiverName:req.body.receiverName,

export const conversationCtrl = async(req,res) => {
    const conv = {       
        members:[req.body.senderId, req.body.receiverId]
    }
    await createConv(conv)
    res.status(201).json(conv)
}

//Controlador para recuperar la conversacion

export const getConversations = async(req,res) => {
    const conversations = await retrieveConv()
    res.json(conversations)
}

export const getConversationByIdCtrl = async(req,res) =>{
    const {id} = req.params
    
    const conv = await  retreiveConversationById(id)
    if(conv !== undefined)res.json(conv)
    else res.sendStatus(404)
}

export const getConversationsUserCtrl = async(req,res)=> {
    const {id} = req.params
    const conversationById = await retreiveConversationById(id)
    const filter = conversationById.map(e => e.members.find(u => u !== id))

      const listUsers = await Promise.all(
          filter.map(async e => {
              return await retreiveUsersById(e)
          })
      )

    res.json(listUsers)
}