import express from "express"

import { conversationCtrl, getConversations} from "./conversation.controller.js"
// AQUI CREO LA CONVERSACION

const router = express.Router()

router.route('/')
    .post(conversationCtrl)
    .get(getConversations)


export default router