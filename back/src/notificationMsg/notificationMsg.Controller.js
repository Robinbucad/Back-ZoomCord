import { createNotificationMsg, deleteNotifications, retrieveNotificationsMsgByReceiver } from "./notificationMsg.model.js"


export const postNotMsgCtrl = async(req,res) => {
    const notMsg = {
        conversationId:req.body.conversationId,
        senderId:req.body.senderId
    }
    const createNotMsg =await createNotificationMsg(notMsg)
    res.json(createNotMsg)
}

export const getNotReceiverCtrl = async(req,res) => {
    const {receiverId} = req.params
    console.log(receiverId)
    const receiver =await retrieveNotificationsMsgByReceiver(receiverId)
    res.json(receiver)
}

export const delNotMsgCtrl = async(req,res) => {
    const {receiverId} = req.params
    const notMsg = await retrieveNotificationsMsgByReceiver(receiverId)

    if(notMsg !== null){
        deleteNotifications(receiverId)
        res.json(notMsg)
    }else{
        res.sendStatus(404)
    }
}