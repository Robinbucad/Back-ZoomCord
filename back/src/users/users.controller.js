
import {retreiveUsersById, retrieveUserInfoByEmail, retrieveUsers} from './users.model.js'

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
        console.log(users)
        res.json(users)

} 

export const getUserByIdCtrl = async(req,res) => {

    const {id} = req.params;
    
    const user = await retreiveUsersById(id);
    console.log(user)
    if(user !== undefined)res.json(user);
    else res.sendStatus(404)
}

