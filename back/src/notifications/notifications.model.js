const {MPASS} = process.env
import { MongoClient } from 'mongodb'


const URI = `mongodb+srv://robin:${MPASS}@discord.3po3g.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

const client = new MongoClient(URI);
const DATABASE_NAME = 'social';
const COLLECTION_NAME = 'notificaciones'

export const retrieveNotifications = async(userId) => {
    try{
        await client.connect();
       
        const db = client.db(DATABASE_NAME);
        const messageCol = db.collection(COLLECTION_NAME);
        const query = {userId}
        const opt ={ projection:{_id:0}
        }
        
        const notifications = await messageCol.find(query,opt).toArray()


        return notifications ?? undefined

    }catch(err){
        console.error(`Retrieve notifications error :${err}`)
    }finally{
       await client.close()
    }
}


export const createNotification = async (notifications) => {
    try{
        await client.connect(); 
        const db = client.db(DATABASE_NAME); 
        const notificationsCol = db.collection(COLLECTION_NAME);

        await notificationsCol.insertOne(notifications)
    }catch(err){
        console.error('Wrong notification: ', err);
    }finally {
        await client.close(); 
    }
}


export const retrieveNotificationsByReceiver = async(receiverId) => {
    try{
        await client.connect();
       
        const db = client.db(DATABASE_NAME);
        const notCol = db.collection(COLLECTION_NAME);
        const query = {receiverId}
        
        const notifications = await notCol.find(query,).toArray()

        return notifications ?? undefined

    }catch(err){
        console.error(`Retrieve notifications error :${err}`)
    }finally{
       await client.close()
    }
}

export const deleteNotification = async(receiverId) => {
    try{
        await client.connect()
        console.log(receiverId)
        const db = client.db(DATABASE_NAME);
        const notsCol = db.collection(COLLECTION_NAME);
        const query = {receiverId:receiverId}
        const nots = await notsCol.deleteMany(query)
        return  nots
    }catch(err){
        console.error('Error al borrar usuario', err)
    }finally{
       await client.close()
    }
}