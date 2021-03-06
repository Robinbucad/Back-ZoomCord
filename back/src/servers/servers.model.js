import { MongoClient, ObjectId } from 'mongodb'
const {MPASS} = process.env

const URI = `mongodb+srv://robin:${MPASS}@discord.3po3g.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

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
        await client.close()
    }
}

export const retrieveServerById = async(id) => {
    try{
        await client.connect()
        const db = client.db(DATABASE_NAME);
        const server = db.collection(COLLECTION_NAME);
        
        const query = {
            _id:ObjectId(id)
        }
  
        const serverFind = await server.findOne(query)
        return serverFind
    
    }catch(err){
        console.error('Error al recibir servidor', err)
    }finally{
        await  client.close()
    }
}

export const pushMemberSever = async(id,userId) => {
    try{
        await client.connect()
        const db = client.db(DATABASE_NAME);
        const server = db.collection(COLLECTION_NAME);
        
        const query = {
            _id:ObjectId(id)
        }
      

        const opt = {
            $push: {
                members:userId
            }
        }
        const serverFind = await server.updateOne(query,opt)
        return serverFind
    
    }catch(err){
        console.error('Error al recibir servidor', err)
    }finally{
        await client.close()
    }
}

export const retrieveServerByUser = async(id) => {
    try{
        await client.connect(); 
        const db = client.db(DATABASE_NAME); 
        const converServCol = db.collection(COLLECTION_NAME);
        const opt = {
            projection: { status:0 }
        }


        const conver = await converServCol.find({"members":id}, opt).toArray(); 
        return conver ?? undefined;
    }catch(err){
        console.error('Retrieve conv2 error: ', err);
    }finally {
        await  client.close(); 
    }
}

export const deleteServer = async(id) => {
    try{
        await client.connect()
        const db = client.db(DATABASE_NAME);
        const usersCol = db.collection(COLLECTION_NAME);
        const query = {_id:ObjectId(id)}
        const servs = await usersCol.deleteOne(query)
        return  servs
    }catch(err){
        console.error('Error al borrar usuario', err)
    }finally{
       await client.close()
    }
}

export const patchServName = async(id,name) => {
    try{
        await client.connect(); 
        const db = client.db(DATABASE_NAME); 
        const servCol = db.collection(COLLECTION_NAME);

        const servName = await servCol.updateOne({"_id":ObjectId(id)}, {$set:name}); 
        return servName ?? undefined;
    }catch(err){
        console.error('Retrieve servers error: ', err);
    }finally {
      await  client.close(); 
    }
}