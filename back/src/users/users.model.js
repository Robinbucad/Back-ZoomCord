import { MongoClient, ObjectId } from 'mongodb'
const {MONGO_DB_URI} = process.env
export const client = new MongoClient(MONGO_DB_URI);

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
       await client.close()
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
        await client.close()
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
       await client.close();
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
       await client.close();
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
       await client.close();
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
        return users ?? undefined
    }catch(err){
        console.error('Retrieve users err:', err)
    }finally{
       await client.close()
    }
}

export const retreiveUsersById = async (id) => {
    const client = new MongoClient(MONGO_DB_URI)

    try{
        await client.connect(); 
        const db = client.db(DATABASE_NAME); 
        const userCol = db.collection(COLLECTION_NAME);
        const opts = {
            projection:{password:0, status:0, email:0, date:0}
        }
        const user = await userCol.findOne({'_id':ObjectId(id)},opts); 
        return user ;
    }catch(err){
        console.error('Retrieve users by id error: ', err);
    }finally {
        await client.close(); 
    }
};



export const deleteUser = async(id) => {
    try{
        await client.connect()
        const db = client.db(DATABASE_NAME);
        const usersCol = db.collection(COLLECTION_NAME);
        const query = {_id:ObjectId(id)}
        const users = await usersCol.deleteOne(query)
        return  users
    }catch(err){
        console.error('Error al borrar usuario', err)
    }finally{
       await client.close()
    }
}

export const retreiveUsersByUsername = async (username) => {
    try{
        await client.connect(); 
        const db = client.db(DATABASE_NAME); 
        const userCol = db.collection(COLLECTION_NAME);
        const opt = {
            projection: { status:0 }
        }
     
        const users = await userCol.find({"username":username}, opt).toArray(); 
     
        return users ?? undefined;
    }catch(err){
        console.error('Retrieve users by username error: ', err);
    }finally {
      await  client.close(); 
    }
};



export const patchUserEmail = async (id,email) => {
    try{
        await client.connect(); 
        const db = client.db(DATABASE_NAME); 
        const userCol = db.collection(COLLECTION_NAME);

        const userEmail = await userCol.updateOne({"_id":ObjectId(id)}, {$set:email}); 
        return userEmail ?? undefined;
    }catch(err){
        console.error('Patch email error: ', err);
    }finally {
       await client.close(); 
    }
};

export const patchUsername = async (id,username) => {
    try{
        await client.connect(); 
        const db = client.db(DATABASE_NAME); 
        const userCol = db.collection(COLLECTION_NAME);

        const userEmail = await userCol.updateOne({"_id":ObjectId(id)}, {$set:username}); 
        return userEmail ?? undefined;
    }catch(err){
        console.error('Retrieve users error: ', err);
    }finally {
      await  client.close(); 
    }
};

export const patchImg = async (id,img) => {
    try{
        await client.connect(); 
        const db = client.db(DATABASE_NAME); 
        const userCol = db.collection(COLLECTION_NAME);

        const userEmail = await userCol.updateOne({"_id":ObjectId(id)}, {$set:img}); 
        return userEmail ?? undefined;
    }catch(err){
        console.error('Patch img: ', err);
    }finally {
       await client.close(); 
    }
};

