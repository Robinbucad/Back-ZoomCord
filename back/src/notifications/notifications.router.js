

import express from "express";

import {getNotificationsByReceiverCtrl, getNotificationsCtrl,postNotificationCtrl} from './notifications.controller.js'
import { validateNotification } from "./notifications.middleware.js";

const router = express.Router()
//,

router.route('/')
    .get(getNotificationsCtrl)
    .post(validateNotification,postNotificationCtrl)

router.route('/:receiverId')
    .get(getNotificationsByReceiverCtrl)


export default router