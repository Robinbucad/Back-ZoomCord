
import express from "express";
import { loginCtrl, registerCtrl, validateEmailCtrl } from "./auth.controller.js";
import { validateUser } from "./auth.middleware.js";

const router = express.Router()

router.post('/register',validateUser,registerCtrl )

router.get('/validate', validateEmailCtrl)

router.post('/login', loginCtrl)

export default router