import express from "express";
import { validateAuth } from "../auth/auth.middleware.js";
import {validateDelServMiddleware, validateUpdateNameServMiddleware} from './servers.middleware.js'
import {serversCtrl,createServerCtrl,changeServNameCtrl ,getServerById,pushMemberCtrl, getServConversationByIdCtrl,delServCtrl} from './servers.controller.js'
import { upload } from "../multer/index.js";


const router = express.Router()

router.route('/')
    .get(validateAuth,serversCtrl)
    .post(upload.single('file'),validateAuth,createServerCtrl)

router.route('/:id')
    .get(getServerById)
    .post(validateAuth,pushMemberCtrl)
    .delete(validateAuth, validateDelServMiddleware,delServCtrl)
    .patch(validateAuth,validateUpdateNameServMiddleware,changeServNameCtrl)

router.route('/conversations/:id')
    .get(validateAuth,getServConversationByIdCtrl)

export default router