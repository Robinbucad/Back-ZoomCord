import express from "express";
import {getPostCtrl,postPubCtrl,getPostByIdCtrl,updateLikeCtrl} from './pub.controller.js'
import { upload } from "../multer/index.js";

const router = express.Router()

router.route('/')
    .get(getPostCtrl)
    .post(upload.single('file'),postPubCtrl)

router.route('/:id')
    .get(getPostByIdCtrl)
    .patch(updateLikeCtrl)
export default router