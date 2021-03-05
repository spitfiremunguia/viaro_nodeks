import { Db, ObjectID } from 'mongodb';
import * as dotenv from 'dotenv';
dotenv.config();


export class AgencyRepository
{
    private db:Db;
    private collectionName:string;
    constructor(db:Db){
        this.db=db;
        this.collectionName='agency';
    }

    public async GetAgencies()
    {
        try{
            const agencies=await this.db.collection(this.collectionName).find().toArray();
            return agencies;
        }
        catch(e){
            console.log(`ERROR TRYING TO RETRIEVE AT ${this.collectionName}: ${e}`);
        }

    }
    public async GetAgenciesById(id:string)
    {
        try{
            const agencyId=new ObjectID(id);
            const query={_id:agencyId};
            const agencies=await this.db.collection(this.collectionName).find(query).toArray();
            return agencies;
        }
        catch(e){
            console.log(`ERROR TRYING TO RETRIEVE AT ${this.collectionName}: ${e}`);
        }

    }
}