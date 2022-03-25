
import { MongoClient, ObjectId } from 'mongodb'

const URI = 'mongodb+srv://robin:1122loco@discord.3po3g.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

const client = new MongoClient(URI);
const DATABASE_NAME = 'social';
const COLLECTION_NAME = 'publications'

export const retrievePubs = async() => {
    try{
        await client.connect();
   
        const db = client.db(DATABASE_NAME);
        const pubsCol = db.collection(COLLECTION_NAME);
 
        const publications = await pubsCol.find({},{}).toArray()
        return publications ?? undefined

    }catch(err){
        console.error(`Retrieve publications error :${err}`)
    }finally{
        await client.close()
    }
}

export const createPublication = async(publication) => {
    try{
        await client.connect();
        const db = client.db(DATABASE_NAME);
        const pubsCol = db.collection(COLLECTION_NAME)

        await pubsCol.insertOne(publication)
    }catch(err){
        console.error('Error al crear el publicacion', err)
    }finally{
        await client.close()
    }
}

export const retrievePostById = async (id) => {
    try{
        await client.connect(); 
        const db = client.db(DATABASE_NAME); 
        const userCol = db.collection(COLLECTION_NAME);   
        const post = await userCol.findOne({'_id':ObjectId(id)}, {}); 
      
        return post ?? undefined;
    }catch(err){
        console.error('Retrieve posts error: ', err);
    }finally {
        await client.close(); 
    }
};


export const setLikes = async (id,username) => {
    try{
        await client.connect(); 
        const db = client.db(DATABASE_NAME); 
        const pubsCol = db.collection(COLLECTION_NAME);
      
        const query={_id:ObjectId(id)}
        const opt = {$push:{likes:username}}
      
        const likes = await pubsCol.updateOne(query,opt)
        return likes
    }catch(err){
        console.error('Retrieve users error: ', err);
    }finally {
        await client.close(); 
    }
};

export const unsetLikes = async (id,username) => {
    try{
        await client.connect(); 
        const db = client.db(DATABASE_NAME); 
        const pubsCol = db.collection(COLLECTION_NAME);
      
        const query={_id:ObjectId(id)}
        const opt = {$pull:{likes:username}}

        const likes = await pubsCol.updateOne(query,opt)
        return likes
    }catch(err){
        console.error('Retrieve users error: ', err);
    }finally {
        await client.close(); 
    }
};
