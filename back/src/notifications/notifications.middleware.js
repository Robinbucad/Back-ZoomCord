import { retrieveNotifications, retrieveNotificationsByReceiver } from "./notifications.model.js"

export const validateNotification = async(req,res,next) => {
    const senderName = req.body.senderName
    const notification = await retrieveNotifications()

    if(notification.some(e => e.senderName === senderName)){
        res.sendStatus(409)
    }else{
        next()
        res.status(200)
}
}