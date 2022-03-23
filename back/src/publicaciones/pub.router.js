import express from "express";
import {getPostCtrl,postPubCtrl,getPostByIdCtrl,updateLikeCtrl} from './pub.controller.js'

const router = express.Router()

router.route('/')
    .get(getPostCtrl)
    .post(postPubCtrl)

router.route('/:id')
    .get(getPostByIdCtrl)
    .patch(updateLikeCtrl)
export default router