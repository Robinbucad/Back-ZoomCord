
/**
 * 
 * Validamos el usuario
 * HAY UNA LIBRERIA QUE REVSA Y DICE SI LA PASS ES SEGURA
 */
import * as EmailValidator from 'email-validator';
import jwt from 'jsonwebtoken'
import {jwt_secret } from './auth.secrets.js'

export const validateUser = (req,res,next) => {
    if(EmailValidator.validate(req.body.email)){
        next();
    }else{
        res.status(400).json({error: 'El email no es válido'})
    }
   
}

/*Valida el token y si es valido añade a la qequest el email */

export  const validateAuth = (req,res,next) => {

    try{
        const auth = req.header(`Authorization`)
        const token = auth.split(' ')[1];
        const payload = jwt.verify(token,jwt_secret)
        // añadir a la request un nuevo atributo
        req.email = payload.email
        next()
    }catch(err){
        console.error(err)
        // esto signifia que el token NO es valido o no hay token
        res.sendStatus(401)
    }
}