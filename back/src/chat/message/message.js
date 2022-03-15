import mongoose from 'mongoose'

export const MessageSchema = new mongoose.Schema( //Creo un esquema mongoose que es tiene estructura JSON
    {
        conversationId:{
            type:String,
        },
        sender:{
            type:String,
        },
        text:{
            type:String,
        }
    },
    {timestamps: true}
);

