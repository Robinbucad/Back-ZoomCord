import express from "express"
import { registerCtrl } from "./auth.controller.js"


const routerAuth = express.Router()

routerAuth.route('/')
    .post(registerCtrl)

export default routerAuth