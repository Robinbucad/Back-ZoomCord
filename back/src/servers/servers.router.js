import express from "express";
import { validateAuth } from "../auth/auth.middleware.js";
import {serversCtrl,createServerCtrl, getServerById,pushMemberCtrl, getServConversationByIdCtrl} from './servers.controller.js'


const router = express.Router()

router.route('/')
    .get(validateAuth,serversCtrl)
    .post(validateAuth,createServerCtrl)

router.route('/:id')
    .get(getServerById)
    .post(validateAuth,pushMemberCtrl)

router.route('/conversations/:id')
    .get(validateAuth,getServConversationByIdCtrl)

export default router