import express from "express"
import { messageCtrl } from "./message.controller.js"



const router = express.Router()

router.route('/')
    .post(messageCtrl)

export default router