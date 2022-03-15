import {MongoClient} from 'mongodb'


const URI = 'mongodb+srv://robin:1122loco@discord.3po3g.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const DB_NAME = 'social'
const COLLECTION_NAME = 'users'
const client = new MongoClient(URI)

export const retrieveUsers = async ( ) =>{
    try{
        await client.connect();
        const db = client.db(DB_NAME);
        const usersCol = db.collection(COLLECTION_NAME);
        const opt = {
            projection:{ _id:0 }
        }

        const users = await usersCol.find({},opt).toArray();
        return users
    }catch(err){
        console.error('Retrieve user err: ', err)
    }finally{
        await client.close()
    }
       
}

export const createUser = async (user) => {
    try{
        await client.connect();
        const db = client.db(DB_NAME);
        const usersCol = db.collection(COLLECTION_NAME);
        
        await usersCol.insertOne(user)
    }catch(err){
        console.error('Create user err: ', err)
    }finally{
        await client.close()
    }
}

export const retrieveUserByID = async (id) => {

    try{
        await client.connect();
        const db = client.db(DB_NAME);
        const userCol = db.collection(COLLECTION_NAME);
        const opt =  {
            projection:{id:0}
        }
        const query = { id }
 
        const users = await userCol.findOne(query,opt)
      
        return users ?? undefined
    }catch(err){
        console.error('Get user id err: ', err)
    }finally{
        await client.close()
    }
}

export const deleteUser = async(id) => {
    try{
        await client.connect()
        const db =  client.db(DB_NAME);
        const userCol = db.collection(COLLECTION_NAME)
        const query = {id: id }

        const users = await userCol.deleteOne(query)
        return users
    }catch(err){
        console.error('Delete user error: ', err)
    }finally{
        await client.close()
    }
}