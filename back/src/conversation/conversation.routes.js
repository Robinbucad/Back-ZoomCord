import express from "express"
import { conversationCtrl, getConversations, getConversationByIdCtrl} from "./conversation.controller.js"
// AQUI CREO LA CONVERSACION

const router = express.Router()

router.route('/')
    .post( conversationCtrl)
    .get(getConversations)
router.route('/:id')
    .get(getConversationByIdCtrl)

export default router