import { MongoClient, ObjectId } from 'mongodb'

const URI = 'mongodb+srv://robin:1122loco@discord.3po3g.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

const client = new MongoClient(URI);
const DATABASE_NAME = 'social';
const COLLECTION_NAME = 'servers'

export const retrieveServers = async () => {
    try{
        await client.connect(); 
        const db = client.db(DATABASE_NAME); 
        const servs = db.collection(COLLECTION_NAME);
     
        const servers = await servs.find({}, ).toArray(); 
        return  servers;
    }catch(err){
        console.error('Retrieve Conversation error: ', err);
    }finally {
        await client.close(); 
    }
};

export const createServer = async (server) => {
    try {
        await client.connect()
        const db = client.db(DATABASE_NAME)
        const servers = db.collection(COLLECTION_NAME)
        return await servers.insertOne(server);
    } catch (err) {
        console.error(err)
    } finally {
        client.close()
    }
}