
import { MongoClient } from 'mongodb'

const URI = 'mongodb+srv://robin:1122loco@discord.3po3g.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

const client = new MongoClient(URI);
const DATABASE_NAME = 'social';
const COLLECTION_NAME = 'messages'

//Creo el mensaje 
export const createMsg = async (msg) => {
    try{
        await client.connect(); 
        const db = client.db(DATABASE_NAME); 
        const message = db.collection(COLLECTION_NAME);

        await message.insertOne(msg)
    }catch(err){
        console.error('Wrong message: ', err);
    }finally {
        await client.close(); 
    }
}


//Recupero todos los mensajes de una misma conversacion

export const retrieveMsg = async(conversationId) => {
    try{
        await client.connect();
       
        const db = client.db(DATABASE_NAME);
        const messageCol = db.collection(COLLECTION_NAME);
        const query = {conversationId}
        const opt ={
            projection:{_id:0}
        }
        
        console.log(query)
        const messages = await messageCol.find(query,opt).toArray()
    
        // const messages = await messageCol.find(query).toArray(function(err,res){
        //     console.log(res)
        // })

        return messages ?? undefined

    }catch(err){
        console.error(`Retrieve messages error :${err}`)
    }
}