import express from "express";
import {ConversationSchema} from './conversation.js'

//Conversation

const router = express.Router()

router.post("/",async (req,res) => {
    const newConver = new ConversationSchema({
        members:[
            ...req.body
        ]
    })

    try{
        const savedConversation = await newConver.save();
        res.status(200).json(savedConversation)
    }catch(err){
        res.status(500).json(err)
    }
})


export default router