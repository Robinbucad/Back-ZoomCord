import { createPublication, retrievePostById, retrievePubs,setLikes, unsetLikes } from "./pub.model.js"

export const getPostCtrl = async(req,res) =>{
    const pubs = await retrievePubs()
    res.json(pubs)

} 

export const postPubCtrl = async (req,res) => {
    const publication = {
        username:req.body.username,
        description:req.body.description,
        img:req.body.img,
        likes:[]
    }
    await createPublication(publication)
    res.json(publication)
}

export const getPostByIdCtrl = async(req,res) => {
    const {id} = req.params
    const post =await retrievePostById(id)
    if(!post !== undefined){
        res.json(post)
    }else{
        res.sendStatus(404)
    }
   
}

export const updateLikeCtrl = async(req,res) => {
    const {id} = req.params
    const post =await retrievePostById(id)
    if(post.likes.includes(req.body.username)){
        res.sendStatus(200)
        unsetLikes(id,req.body.username)
    }else{
        setLikes(id,req.body.username)
        res.sendStatus(200)
    }
   
}

