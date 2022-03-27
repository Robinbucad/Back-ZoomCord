import { retrievePostById } from "./pub.model.js"


export const deletePostMw = async(req,res,next) => {
    const idUser = req.body.id
    const {id} = req.params
    const postById =await retrievePostById(id)
    if(postById.id === idUser){
        res.status(200)
        next()
    }else{
        res.sendStatus(409)
    }
}   