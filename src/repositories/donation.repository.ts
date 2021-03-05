import { Db } from 'mongodb';
import { Donation } from '../models/Donation';
import * as dotenv from 'dotenv';
dotenv.config();

export class DonationRepository{
    private db:Db;
    private collectionName:string;
    constructor(db:Db){
        this.db=db;
        this.collectionName='donations';
    }
    public async addDonation(donation:Donation){

        try{
            const result =await this.db.collection(this.collectionName)
            .insertOne(donation);
            return result.insertedId;
        }
        catch(e){
            console.log(`ERROR TRYING TO INSERT AT ${this.collectionName}: ${e}`)
        }
    }

    public async getDonationsByUserId(userId:string){

        try{

            const query={'UserId':userId}
            const projection={'Date':1,'Amount':1,'AgencyId':1,'Frequency':1,'Country':1,'Email':1,'_id':0}
            const result =await this.db.collection(this.collectionName)
            .find(query).project(projection).toArray();
            return result;
        }
        catch(e){
            console.log(`ERROR TRYING TO RETRIEVE AT ${this.collectionName}: ${e}`);
        }
    }
}