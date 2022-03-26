

import express from "express";

import {getNotificationsByReceiverCtrl, getNotificationsCtrl,postNotificationCtrl,deleteNotificationsCtrl} from './notifications.controller.js'
import { validateNotification } from "./notifications.middleware.js";

const router = express.Router()
//,

router.route('/')
    .get(getNotificationsCtrl)
    .post(validateNotification,postNotificationCtrl)

router.route('/:receiverId')
    .get(getNotificationsByReceiverCtrl)
    .delete(deleteNotificationsCtrl)

export default router