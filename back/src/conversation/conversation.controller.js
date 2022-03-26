import { createConv, retreiveConversationById, retrieveConv } from "./conversation.model.js"


// Controlador que manda el body del mensaje

export const conversationCtrl = async(req,res) => {
    const conv = {
        receiverName:req.body.receiverName,
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

