import express from "express";
import { createMsgServCtrl, getMessagesCtrl,conversationServCtrl } from "./messageServer.controller.js";


const router = express.Router()

router.route('/')
    .get(getMessagesCtrl)
    .post(createMsgServCtrl)

router.route('/:conversationId/')
    .get(conversationServCtrl)
export default router