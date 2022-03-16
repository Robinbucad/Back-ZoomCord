import { createConv, retrieveConv } from "./conversation.model.js"


// Controlador que manda el body del mensaje

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


