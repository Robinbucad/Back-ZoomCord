import express from 'express';
import { getUserInfo, getFriendListCtlr, getUserByIdCtrl,deleteCurrentUserCtrl,getUsersByUsernameCtrl } from './users.controller.js';


const router = express.Router();

router.route('/')
    .get(getUserInfo)
    

router.route('/friends/:id')
    .get(getFriendListCtlr)

router.route('/friends/add/:username')
    .get(getUsersByUsernameCtrl)

router.route('/:id')
    .get(getUserByIdCtrl)
    .delete(deleteCurrentUserCtrl)

export default router;