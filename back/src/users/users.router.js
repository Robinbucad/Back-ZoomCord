import express from 'express';
import { getUserInfo, getFriendListCtlr, getUserByIdCtrl,deleteCurrentUserCtrl } from './users.controller.js';


const router = express.Router();

router.route('/')
    .get(getUserInfo)
    

router.route('/friends')
    .get(getFriendListCtlr)


router.route('/:id')
    .get(getUserByIdCtrl)
    .delete(deleteCurrentUserCtrl)

export default router;