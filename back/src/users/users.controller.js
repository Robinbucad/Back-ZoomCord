import { createUser, deleteUser, retrieveUserByID, retrieveUsers } from "./users.models.js"
import { v4 as uuidv4 } from 'uuid'


export const getUserCtrl = async (req,res) => {
    const users = await retrieveUsers()
    res.json(users)
}

export const createUserCtrl = async (req,res) => {
    const user = {
        ...req.body,
        id:uuidv4()
    }
    await createUser(user)
    res.status(201).json(user)
}


export const getUserByIdCtrl = async(req,res) => {
    const {id} = req.params

    const user = await retrieveUserByID(id)
    if(user !== undefined) res.json(user)
    else res.sendStatus(404)
}

export const deleteUserCtrl = async(req,res) => {
    const {id} = req.params;
    const user = await deleteUser(id)
    res.json(user)
}