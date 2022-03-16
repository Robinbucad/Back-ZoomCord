import { MongoClient } from 'mongodb'

const URI = 'mongodb+srv://robin:1122loco@discord.3po3g.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

const client = new MongoClient(URI);
const DATABASE_NAME = 'social';
const COLLECTION_NAME = 'chat'

export const createConv = async (chat) => {
    try{
        await client.connect(); 
        const db = client.db(DATABASE_NAME); 
        const conv = db.collection(COLLECTION_NAME);

        await conv.insertOne(chat)
    }catch(err){
        console.error('Conv wrong: ', err);
    }finally {
        await client.close(); 
    }
}



export const retrieveConv = async () => {
    try{
        await client.connect(); 
        const db = client.db(DATABASE_NAME); 
        const convs = db.collection(COLLECTION_NAME);
     
        const conversations = await convs.find({}, ).toArray(); 
        return  conversations;
    }catch(err){
        console.error('Retrieve Conversation error: ', err);
    }finally {
        await client.close(); 
    }
};

