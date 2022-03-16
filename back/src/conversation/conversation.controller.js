import { createConv } from "./conversation.model.js"


export const conversationCtrl = async(req,res) => {
    const conv = {
        members:[req.body.senderId, req.body.receiverId]

    }


    
    await createConv(conv)
    res.status(201).json(conv)
}