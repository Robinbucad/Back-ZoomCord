import {mongoose} from 'mongoose'

export const ConversationSchema = new mongoose.Schema( //Creo un esquema mongoose que es tiene estructura JSON
    {
        member:{
            type:Array,
        }
    },
    {timestamps: true}
);

