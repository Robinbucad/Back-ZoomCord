import express from "express"
import { createUserCtrl, deleteUserCtrl, getUserByIdCtrl, getUserCtrl } from "./users.controller.js"


const router = express.Router()

router.route('/')
    .get(getUserCtrl)
    .post(createUserCtrl)

router.route('/:id')
    .get(getUserByIdCtrl)
    .delete(deleteUserCtrl)

export default router