import { Db } from 'mongodb';
import { Credentials } from '../models/Credentials';
import * as dotenv from 'dotenv';
dotenv.config();


export class AuthRepository{
    private db:Db;
    private collectionName:string='accounts';
    constructor(db:Db){
        this.db=db;
    }
    public async VerifyCredentials(credentials:Credentials){

        try{

            const query={ 'credentials.username':credentials.username,'credentials.password':credentials.password}
            const result = await this.db.collection(this.collectionName)
            .find(query).limit(1).toArray();
            // console.log(result);
            if(result)
                return result;
            return null;
        }
        catch(e){
            console.log(`ERROR TRYING TO RETRIEVE AT ${this.collectionName}: ${e}`)
        }



    }

}