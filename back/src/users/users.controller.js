
import {deleteUser, retreiveUsersById, retreiveUsersByUsername, retrieveUserInfoByEmail, retrieveUsers} from './users.model.js'

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


//Controlador que da la lista de usuarios de la aplicacion

export const getFriendListCtlr = async (req,res) => {
        const users = await retrieveUsers()
        console.log(users)
        res.json(users)

} 

//Controlador que obtiene el usuario por ID

export const getUserByIdCtrl = async(req,res) => {

    const {id} = req.params;
    
    const user = await retreiveUsersById(id);
    if(user !== undefined)res.json(user);
    else res.sendStatus(404)
}

export const deleteCurrentUserCtrl = async(req,res) => {
    const {id} = req.params
    const user =await  deleteUser(id)
    res.json(user)
    console.log(user)
}


export const getUsersByUsernameCtrl = async(req,res) => {
    const {username} = req.params
    
    const users = await retreiveUsersByUsername(username)
    console.log(users)
    res.json(users)

}