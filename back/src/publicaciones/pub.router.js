import express from "express";
import {getPostCtrl,postPubCtrl,getPostByIdCtrl,updateLikeCtrl,delPubCtrl} from './pub.controller.js'
import { upload } from "../multer/index.js";
import { deletePostMw } from "./deletePostMiddleware.js";

const router = express.Router()

router.route('/')
    .get(getPostCtrl)
    .post(upload.single('file'),postPubCtrl)

router.route('/:id')
    .get(getPostByIdCtrl)
    .patch(updateLikeCtrl)
    .delete(deletePostMw,delPubCtrl)
export default router