import { retrievePostById } from "../publicaciones/pub.model.js"
import {  retrieveNotificationsByReceiver } from "./notifications.model.js"

export const validateNotification = async(req,res,next) => {
    const receiverId = req.body.receiverId
    const senderUser = req.body.senderName
    const postId = req.body.postId
    const post = await retrievePostById(postId)

    
    if( post.likes.some(e => e === senderUser)){
        res.status(409)
    }else{
        res.status(200)
        next()
    }
}