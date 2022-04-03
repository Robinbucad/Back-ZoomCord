
import { MongoClient } from 'mongodb'
const {MPASS} = process.env



const URI = `mongodb+srv://robin:${MPASS}@discord.3po3g.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

const client = new MongoClient(URI);
const DATABASE_NAME = 'social';
const COLLECTION_NAME = 'messages'


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

export const retrieveMsg = async(conversationId) => {
    try{
        await client.connect();
       
        const db = client.db(DATABASE_NAME);
        const messageCol = db.collection(COLLECTION_NAME);
        const query = {conversationId}
        const opt ={
            projection:{_id:0}
        }
        
        const messages = await messageCol.find(query,opt).toArray()


        return messages ?? undefined

    }catch(err){
        console.error(`Retrieve messages error :${err}`)
    }finally{
       await client.close()
    }
}