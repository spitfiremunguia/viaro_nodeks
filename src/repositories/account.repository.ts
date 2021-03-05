import { Db,ObjectID } from 'mongodb';
import { Account } from '../models/Account';
import * as dotenv from 'dotenv';
dotenv.config();


export class AccountRepository{
    private db:Db;
    private collectionName:string='accounts';
    constructor(db:Db){
        this.db=db;
    }
    public async addAccount(account:Account){

        try{
            const result =await this.db.collection(this.collectionName)
            .insertOne(account);
            return result.insertedId;
        }
        catch(e){
            console.log(`ERROR TRYING TO INSERT AT ${this.collectionName}: ${e}`)
        }
    }

    public async GetUser(id:string)
    {
        try{
            const userId=new ObjectID(id);
            const projection={credentials:0}
            const query={_id:userId}
            const result=await this.db.collection(this.collectionName).find(query).project(projection).limit(1).toArray();
            return result;
        }
        catch(e){
            console.log(`ERROR TRYING TO RETRIEVE AT ${this.collectionName}: ${e}`)
        }
    }

    public async GetUserCredentialsBy(username:string)
    {
        try{
            const projection={user:0,_id:0}
            const query={'credentials.username':username}
            const result=await this.db.collection(this.collectionName).find(query).project(projection).limit(1).toArray();
            return result;
        }
        catch(e){
            console.log(`ERROR TRYING TO RETRIEVE AT ${this.collectionName}: ${e}`)
        }
    }

}