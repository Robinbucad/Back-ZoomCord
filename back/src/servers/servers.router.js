import express from "express";
import {serversCtrl,createServerCtrl, getServerById,pushMemberCtrl, getServConversationByIdCtrl} from './servers.controller.js'


const router = express.Router()

router.route('/')
    .get(serversCtrl)
    .post(createServerCtrl)

router.route('/:id')
    .get(getServerById)
    .post(pushMemberCtrl)

router.route('/conversations/:id')
    .get(getServConversationByIdCtrl)

export default router