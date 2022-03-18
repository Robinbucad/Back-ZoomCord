import { MongoClient, ObjectId } from 'mongodb'

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
        const options = {projection: {password:0}} //CON PROJECTION ELIGES LO QUE NO QUIERES TRAER
        return await users.findOne(query,options);
    } catch (err) {
        console.error(err);
    } finally {
        client.close();
    }
}

// Modelo que recupera los usuarios


export const retrieveUsers = async() => {
    try{
        await client.connect()
        const db = client.db(DATABASE_NAME);
        const usersCol =  db.collection(COLLECTION_NAME);
        const opt = {
            projection:{password:0}
        }
        
        const users = await usersCol.find({}, opt).toArray()
        console.log(users)
        return  users
    }catch(err){
        console.error('Retrieve users err:', err)
    }finally{
        client.close()
    }
}

export const retreiveUsersById = async (id) => {
    try{
        await client.connect(); 
        const db = client.db(DATABASE_NAME); 
        const userCol = db.collection(COLLECTION_NAME);
        const opt = {
            projection: { status:0 }
        }
        const query = { 
            _id:ObjectId(id)
           }

        const user = await userCol.findOne(query, opt); 
        return user ?? undefined;
    }catch(err){
        console.error('Retrieve users error: ', err);
    }finally {
        client.close(); 
    }
};


export const deleteUser = async(id) => {
    try{
        await client.connect()
        const db = client.db(DATABASE_NAME);
        const usersCol = db.collection(COLLECTION_NAME);
        const query = {_id:ObjectId(id)}
        const users = await usersCol.deleteOne(query)
        console.log(users)
        return  users
    }catch(err){
        console.error('Error al borrar usuario', err)
    }finally{
       await client.close()
    }
}