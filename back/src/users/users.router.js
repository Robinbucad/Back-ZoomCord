import express from 'express';
import { getUserInfo,updateImgCtrl,updateEmailCtrl, getFriendListCtlr, getUserByIdCtrl,deleteCurrentUserCtrl,getUsersByUsernameCtrl, updateUsernameCtrl,getAllUsersCtrl } from './users.controller.js';
import { validateUpdateMiddleware } from './users.middleware.js';
import {upload} from '../multer/index.js'

const router = express.Router();

router.route('/')
    .get(getUserInfo)
    

router.route('/friends/:id')
    .get(getFriendListCtlr)
  
router.route('/list/:id')
    .get(getAllUsersCtrl)

router.route('/friends/add/:username')
    .get(getUsersByUsernameCtrl)

router.route('/:id')
    .get(getUserByIdCtrl)
    .delete(deleteCurrentUserCtrl)

    

router.route('/email/:id')
    .patch(validateUpdateMiddleware, updateEmailCtrl)

router.route('/username/:id')
    .patch(validateUpdateMiddleware,updateUsernameCtrl)

router.route('/img/:id')
    .patch(upload.single('file'), updateImgCtrl)


export default router;