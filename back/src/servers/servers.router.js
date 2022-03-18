import express from "express";
import {serversCtrl,createServerCtrl} from './servers.controller.js'

const router = express.Router()

router.route('/')
    .get(serversCtrl)
    .post(createServerCtrl)

export default router