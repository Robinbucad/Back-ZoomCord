import express from "express"

import { conversationCtrl } from "./conversation.controller.js"
// AQUI CREO LA CONVERSACION

const router = express.Router()

router.route('/')
    .post(conversationCtrl)

export default router