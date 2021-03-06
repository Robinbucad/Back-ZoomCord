import { MongoClient } from 'mongodb'
const {MPASS} = process.env


const URI = `mongodb+srv://robin:${MPASS}@discord.3po3g.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

const client = new MongoClient(URI);
const DATABASE_NAME = 'social';
const COLLECTION_NAME = 'messagesServer'

export const createMsgServ = async(msg) => {
    try{
        await client.connect();
        const db = client.db(DATABASE_NAME);
        const messageServ = db.collection(COLLECTION_NAME)

        await messageServ.insertOne(msg)
    }catch(err){
        console.error('Error al crear el mensaje hacia el servidor', err)
    }finally{
        await client.close()
    }
}

export const retrieveMsgServ = async(conversationId) => {
    try{
        await client.connect();
   
        const db = client.db(DATABASE_NAME);
        const messageServCol = db.collection(COLLECTION_NAME);
        const query = {conversationId}
        const opt ={
            projection:{_id:0}
        }
        const messages = await messageServCol.find(query,opt).toArray()
        return messages ?? undefined

    }catch(err){
        console.error(`Retrieve messages error :${err}`)
    }finally{
        await client.close()
    }
}