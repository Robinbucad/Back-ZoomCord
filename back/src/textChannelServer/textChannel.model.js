import { MongoClient} from 'mongodb'

const URI = 'mongodb+srv://robin:1122loco@discord.3po3g.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

const client = new MongoClient(URI);
const DATABASE_NAME = 'social';
const COLLECTION_NAME = 'textChannelServer';



export const retrieveChannels = async () => {
    try{
        await client.connect(); 
        const db = client.db(DATABASE_NAME); 
        const channels = db.collection(COLLECTION_NAME);
     
        const textChannels = await channels.find({}, ).toArray(); 
        return  textChannels;
    }catch(err){
        console.error('Retrieve text channesls error: ', err);
    }finally {
        await client.close(); 
    }
};

export const createChannel = async (channel) => {
    try{
        await client.connect(); 
        const db = client.db(DATABASE_NAME); 
        const conv = db.collection(COLLECTION_NAME);
        await conv.insertOne(channel)
    }catch(err){
        console.error('Channel wrong: ', err);
    }finally {
        await client.close(); 
    }
}


export const retreiveChannelsById = async (serverId) => {
    try{
        await client.connect(); 
        const db = client.db(DATABASE_NAME); 
        const textChannelCol = db.collection(COLLECTION_NAME);
    

        const channel = await textChannelCol.find({"serverId":serverId}, {}).toArray(); 
        return channel ?? undefined;
    }catch(err){
        console.error('Retrieve users text error: ', err);
    }finally {
        await client.close(); 
    }
};