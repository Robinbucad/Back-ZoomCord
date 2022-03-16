import { MongoClient } from 'mongodb'

const URI = 'mongodb+srv://robin:1122loco@discord.3po3g.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

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