import express from "express"
import { messageCtrl,conversationCtrl } from "./message.controller.js"



const router = express.Router()

router.route('/')
    .post(messageCtrl)

router.route('/:conversationId')
    .get(conversationCtrl)
export default router