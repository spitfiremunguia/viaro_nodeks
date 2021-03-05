import { Db } from 'mongodb';
import * as dotenv from 'dotenv';
dotenv.config();


export class ConfigurationRepository {
    private collectionName: string;
    private db: Db;
    constructor(db: Db) {
        this.db = db;
        this.collectionName = 'configurations';
    }

    public async GetConfigurations() {

        const result = await this.db.collection(this.collectionName).find({}).project({_id:0}).toArray();
        return result;
    }
}