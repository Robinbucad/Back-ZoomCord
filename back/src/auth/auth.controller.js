/**
 * 1. Generar entidad del usuario y guardarla en BBDD
 * 2. Generar un token de validacion y guardarlo en BBDD asociado al usuario
 * 3. Enviar un email de validacion
 */

import jwt from 'jsonwebtoken';
import { createUser, getUserbyEmailNoStatus, retrieveSuccessByEmailAndPassword, validateUser } from "../users/users.model.js";
import { encodePassword, generateValidationToken } from "./auth.utils.js";
import {createValidationToken, deleteValidationToken, retrieveValidationToken} from './auth.model.js'
import { sendValidationEmail } from "../adapters/email.js";
import { jwt_secret } from './auth.secrets.js';
import {v4 as uuidv4} from 'uuid'

export const registerCtrl = async(req,res) =>{
    try{
        const user = await getUserbyEmailNoStatus(req.body.email)
        if(user === null){
            req.body.password = encodePassword(req.body.password)
            await createUser({...req.body, status: 'PENDING_VALIDATION' ,file:''})
            const token = generateValidationToken()
            await createValidationToken(token,req.body.email)
            
            sendValidationEmail(req.body.email, `https://aqueous-ocean-87434.herokuapp.com/auth/validate?token=${token}`)
            res.sendStatus(201);
        }else{
            res.sendStatus(409) // MANDO UN CONFLICT (409) SI EL USUARIO EXISTE EN NUEXTRA BBDD
        }
       
    }catch(err){
        console.error(err)
        res.sendStatus(500)
    }
  
}

/*
    Esta funcion obtiene el token, valida que exista en la BBDD y obtiene su valor asociado.
    Elimina el token de la BBDD
    Actualiza el usuario cambiando el estado a SUCCESS
*/

export const validateEmailCtrl = async(req,res) => {
    const {token} = req.query
    console.log(token)
    const valToken = await retrieveValidationToken(token)
    if(valToken !== null){
        //exsite token
        await deleteValidationToken(token) // Esto elimina 
        await validateUser(valToken.user) // Esto actualiza
        res.sendStatus(200)
    }else{
        res.sendStatus(404)
    }
   
}

/**
 *  Verificamos que exista el usuario con su pass y ademas tiene un estado SUCCESS
 *  Hay que encriptar la pass del body
 *  Generar un token JWT
 *  Devolvemos el usuario
 */

export const loginCtrl = async(req,res) => {
    const {email, password} = req.body

    const user = await retrieveSuccessByEmailAndPassword(email,encodePassword(password))

    if(user !== null){
        // existe usuario
        const token = jwt.sign({email:user.email},jwt_secret)
        res.status(201).json({access_token:token})
    }else{
        res.sendStatus(404)
    }
 
}