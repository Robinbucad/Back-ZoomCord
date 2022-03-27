


export const createConversationMiddleware = async(req,res,next) => {
        const receiverId = req.body.receiverId
        const senderId = req.body.senderId

        if(receiverId === senderId){
            res.sendStatus(409)
        }else{
            res.status(200)
            next()
        } 
    }