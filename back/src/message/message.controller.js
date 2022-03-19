import { createMsg, retrieveMsg } from "./message.model.js"


export const messageCtrl = async(req,res) => {
        const message = {
           ...req.body,
           
        }
        await createMsg(message)
        res.status(201).json(message)
}

export const conversationCtrl = async(req,res) => {
        const {conversationId} = req.params
        const messages = await retrieveMsg(conversationId)
        console.log(messages)
        res.json(messages)
     
}