
import {retrieveUserInfoByEmail, retrieveUsers} from './users.model.js'

export const getUserInfo = async (req,res) => {
    //obtener el email --> Lo tengo que obtener del token
    try{
        const user = await retrieveUserInfoByEmail(req.email)
        res.json(user) // Devuelvo json con el usuario
    }
  catch(err){
      console.error(err)
      res.sendStatus(500)
  }
}

export const getFriendListCtlr = async (req,res) => {
        const users = await retrieveUsers()
   
        res.json(users)

} 