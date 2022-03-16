import { createMsg } from "./message.model.js"


export const messageCtrl = async(req,res) => {
        const message = {
           ...req.body
        }


        console.log(message)
        await createMsg(message)
        res.status(201).json(message)
}