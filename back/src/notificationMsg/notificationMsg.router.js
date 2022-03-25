import express from "express"
import {postNotMsgCtrl,getNotReceiverCtrl,delNotMsgCtrl} from './notificationMsg.Controller.js'


const router = express.Router()

router.route('/')
    .post(postNotMsgCtrl)

router.route('/:receiverId')
    .get(getNotReceiverCtrl)
    .delete(delNotMsgCtrl)

export default router