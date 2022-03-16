import { createConv, retrieveConv } from "./conversation.model.js"


export const conversationCtrl = async(req,res) => {
    const conv = {
        members:[req.body.senderId, req.body.receiverId]

    }
    await createConv(conv)
    res.status(201).json(conv)
}

export const getConversations = async(req,res) => {
    const conversations = await retrieveConv()
    res.json(conversations)

}


