
import { MongoClient } from 'mongodb'

const URI = 'mongodb+srv://robin:1122loco@discord.3po3g.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

const client = new MongoClient(URI);
const DATABASE_NAME = 'social';
const COLLECTION_NAME = 'notificationMsg'

export const createNotificationMsg = async (notifications) => {
    try{
        await client.connect(); 
        const db = client.db(DATABASE_NAME); 
        const notificationsMsgCol = db.collection(COLLECTION_NAME);

        await notificationsMsgCol.insertOne(notifications)
    }catch(err){
        console.error('Wrong msg notification: ', err);
    }finally {
        await client.close(); 
    }
}

export const retrieveNotificationsMsgByReceiver = async(receiverId) => {
    try{
        await client.connect();
       
        const db = client.db(DATABASE_NAME);
        const notCol = db.collection(COLLECTION_NAME);
        const query = {receiverId}

        const notifications = await notCol.find(query,{}).toArray()
 
        return notifications ?? undefined

    }catch(err){
        console.error(`Retrieve notifications error :${err}`)
    }finally{
       await client.close()
    }
}

export const deleteNotifications = async(conversationId) => {
    try{
        await client.connect()
        const db = client.db(DATABASE_NAME);

        const usersCol = db.collection(COLLECTION_NAME);
        const query = {conversationId:conversationId}
        const servs = await usersCol.deleteMany(query)
        return  servs
    }catch(err){
        console.error('Error al borrar usuario', err)
    }finally{
       await client.close()
    }
}