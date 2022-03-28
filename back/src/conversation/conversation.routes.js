import express from "express"
import { conversationCtrl, getConversations, getConversationByIdCtrl,getConversationsUserCtrl} from "./conversation.controller.js"
import { createConversationMiddleware } from "./conversation.middleware.js"

// AQUI CREO LA CONVERSACION

const router = express.Router()

router.route('/')
    .post( createConversationMiddleware,conversationCtrl)
    .get(getConversations)
router.route('/:id')
    .get(getConversationByIdCtrl)

router.route('/list/:id')
    .get(getConversationsUserCtrl)

export default router