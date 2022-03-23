import { retreiveUsersById } from "./users.model.js"
import { encodePassword } from "../auth/auth.utils.js"



export const validateUpdateMiddleware =async (req,res,next) => {
    const {id} = req.params
    const pass = encodePassword(req.body.password)
    const user =await  retreiveUsersById(id)
    console.log(user)
    if(pass === user.password){
        next()
    }else{
        res.sendStatus(409)
    }
    
}