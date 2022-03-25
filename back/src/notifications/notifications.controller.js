import { createNotification, retrieveNotifications, retrieveNotificationsByReceiver } from "./notifications.model.js"

export const getNotificationsCtrl = async(req,res) => {
   const notifications =  await retrieveNotifications()
    res.json(notifications)
}

export const postNotificationCtrl = async(req,res) => {

    const notification = {
        ...req.body
    }
    await createNotification(notification)
    res.json(notification)
}

export const getNotificationsByReceiverCtrl = async(req,res) => {
    const {receiverId} = req.params
    const notificationsById = await retrieveNotificationsByReceiver(receiverId)
    res.json(notificationsById)
}