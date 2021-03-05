import { Db } from 'mongodb';
import * as dotenv from 'dotenv';
dotenv.config();


export class CountryRepository {
    private collectionName: string;
    private citiesCollectionName:string;
    private db: Db;
    constructor(db: Db) {
        this.db = db;
        this.collectionName = 'countries';
        this.citiesCollectionName='cities';
    }

    public async GetCountries(countryCode: string, getCities: boolean) {
        let query = {};
        if (countryCode != null && countryCode !== '') {
            query = { 'iso': countryCode };
        }
        const projection = {'cities': getCities?1:0}
        const result = await this.db.collection(this.collectionName).find(query).project(projection).toArray();
        return result;
    }

    public async GetCities(countryCode: string) {
        const query = { 'country_code': countryCode };
        const projection = {'country': 0}
        const result = await this.db.collection(this.citiesCollectionName).find(query).project(projection).toArray();
        return result;
    }
}