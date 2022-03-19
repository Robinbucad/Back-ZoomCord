
import { createMsgServ, retrieveMsgServ } from "./messageServer.model.js"


export const getMessagesCtrl = async(req,res) => {
    res.sendStatus(201)
}


export const createMsgServCtrl = async(req,res) => {
    const messageServ = {
        ...req.body,
    }
     await createMsgServ(messageServ)
    res.json(messageServ)
}

export const conversationServCtrl = async(req,res) => {
    const {conversationId} = req.params
    console.log(conversationId)
    const messages = await retrieveMsgServ(conversationId)
 
    res.json(messages)
 
}