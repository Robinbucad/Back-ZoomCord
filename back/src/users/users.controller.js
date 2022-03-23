
import { encodePassword } from '../auth/auth.utils.js'
import {deleteUser, patchImg, patchUserEmail, patchUsername, retreiveUsersById, retreiveUsersByUsername, retrieveUserInfoByEmail, retrieveUsers} from './users.model.js'

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
        const {id} = req.params
        const users = await retreiveUsersById(id)

        res.json(users)
} 

//Controlador que obtiene el usuario por ID

export const getUserByIdCtrl = async(req,res) => {
    const {id} = req.params;
    console.log(id)
    const user = await retreiveUsersById(id);
    if(user !== undefined)res.json(user);
    else res.sendStatus(404)
}

export const deleteCurrentUserCtrl = async(req,res) => {
    const {id} = req.params
    const user =await  deleteUser(id)
    res.json(user)

}


export const getUsersByUsernameCtrl = async(req,res) => {
    const {username} = req.params
    
    const users = await retreiveUsersByUsername(username)
    console.log(users)
    res.json(users)

}

export const updateEmailCtrl = async(req,res) => {
    const {id} = req.params
    const pass = encodePassword(req.body.password)
    const userNew = {
        email:req.body.email,
        password:pass
    }
    const updatedEmail = await patchUserEmail(id,userNew)   
    res.json(updatedEmail)
}

export const updateUsernameCtrl = async(req,res) => {
    const {id} = req.params
    const userNew = {
        username:req.body.username,
    }
    const updatedUsername = await patchUsername(id,userNew)   
    res.json(updatedUsername)
}



export const updateImgCtrl = async(req,res) => {
    const {id} = req.params
    const userNew = {
        img:req.body.img,
    }
    const updatedUsername = await patchImg(id,userNew)   
    res.json(updatedUsername)
}

