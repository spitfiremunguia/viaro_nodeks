import * as mongo from 'mongodb';
import * as dotenv from 'dotenv';
dotenv.config();
let db:mongo.Db;
let client:mongo.MongoClient;


 const openConnection=async()=>{
    try {
        const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PWD}@${process.env.DB_HOST}:${process.env.DB_PORT}/?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false`;
        client = new mongo.MongoClient(uri);
        await client.connect();
        db = client.db(process.env.DB_NAME);
        console.log(`CONNECTION TO DB ${process.env.DB_NAME} ESTABLISHED!`)
    }
    catch (e) {
        console.log(`CAN\'T CONNECT TO DATABASE ${process.env.DB}: ${e}`)
    }

}


export const getDb=async  ()=> {
    await openConnection();
    return db;
}



