import express from 'express';
import { getUserInfo, getFriendListCtlr } from './users.controller.js';


const router = express.Router();

router.route('/')
    .get(getUserInfo)

router.route('/friends')
    .get(getFriendListCtlr)

export default router;