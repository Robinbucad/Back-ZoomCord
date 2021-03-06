import {MongoClient} from 'mongodb'

const {MPASS} = process.env


const URI = `mongodb+srv://robin:${MPASS}@discord.3po3g.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

const client = new MongoClient(URI);
const DATABASE_NAME = 'twitter';
const COLLECTION_NAME = 'validate-token'

export const createValidationToken = async(token,userName) => {
    try{
        await client.connect()
        const db = client.db(DATABASE_NAME)
        const tokens = db.collection(COLLECTION_NAME)
        return await tokens.insertOne({
            token,
            user:userName
        });
    }catch(err){
        console.error(err)
    }finally{
       await client.close()
    }
}

// esto devuelve el token o null si este no existe 

export const retrieveValidationToken = async(token) => {
    try{
        await client.connect()
        const db = client.db(DATABASE_NAME)
        const tokens = db.collection(COLLECTION_NAME)
        return await tokens.findOne({token});
    }catch(err){
        console.error(err)
    }finally{
        await client.close()
    }
}

// borra el token de la BBDD

export const deleteValidationToken = async(token) => {
    try{
        await client.connect()
        const db = client.db(DATABASE_NAME)
        const tokens = db.collection(COLLECTION_NAME)
        return await tokens.deleteOne({token});
    }catch(err){
        console.error(err)
    }finally{
        await  client.close()
    }
}

