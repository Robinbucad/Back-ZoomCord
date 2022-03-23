import express from "express"
import {getChannelsCtrl, createChannelCtrl,getTextChannelByServId} from './textChannel.controller.js'

const router = express.Router()

router.route('/')
        .get(getChannelsCtrl)
        .post(createChannelCtrl)
router.route('/:serverId')
        .get(getTextChannelByServId)

export default router