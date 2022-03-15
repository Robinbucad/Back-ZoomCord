import { MongoClient } from 'mongodb'

const URI = 'mongodb+srv://robin:1122loco@discord.3po3g.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

const client = new MongoClient(URI);
const DATABASE_NAME = 'social';
const COLLECTION_NAME = 'users'

export const createUser = async (user) => {
    try {
        await client.connect()
        const db = client.db(DATABASE_NAME)
        const users = db.collection(COLLECTION_NAME)
        return await users.insertOne(user);
    } catch (err) {
        console.error(err)
    } finally {
        client.close()
    }
}

export const getUserbyEmailNoStatus = async (email) => { //DADO UN EMAIL ME DEVUELVE EL USUARIO AUNQUE NO ESTE VERIFICADO (STATUS)
    try {
        await client.connect()
        const db = client.db(DATABASE_NAME)
        const users = db.collection(COLLECTION_NAME)
        return await users.findOne({ email });
    } catch (err) {
        console.error(err)
    } finally {
        client.close()
    }
}

export const validateUser = async (email) => {
    try {
        await client.connect();
        const db = client.db(DATABASE_NAME);
        const users = db.collection(COLLECTION_NAME);
        // create a document that sets the plot of the movie
        const updateDoc = {
            $set: {
                status: 'SUCCESS'
            },
        };
        return await users.updateOne({ email }, updateDoc);
    } catch (err) {
        console.error(err);
    } finally {
        client.close();
    }
}


// devuelve el usuario de BBDD que este en estado succes y ademas coincia con el email y con el password que me mandan
export const retrieveSuccessByEmailAndPassword = async (email, password) => {
    try {
        await client.connect();
        const db = client.db(DATABASE_NAME);
        const users = db.collection(COLLECTION_NAME);
        const query = {
            email,
            password,
            status: 'SUCCESS'
        }
        return await users.findOne(query);
    } catch (err) {
        console.error(err);
    } finally {
        client.close();
    }
}

export const retrieveUserInfoByEmail = async (email) => {
    try {
        await client.connect();
        const db = client.db(DATABASE_NAME);
        const users = db.collection(COLLECTION_NAME);
        const query = { email }
        const options = {projection: {_id:0,password:0}} //CON PROJECTION ELIGES LO QUE NO QUIERES TRAER
        return await users.findOne(query,options);
    } catch (err) {
        console.error(err);
    } finally {
        client.close();
    }
}