import {Db} from '../../utils/Db';
const Schema=Db.Schema;

const CountrySchema=new Schema({
    iso:String,
    country:String,
    capital:String,
    currency_code:String,
    currency_name:String,
    currency_symbol:String,
    phone:String,
    postal_code_format:String,
    postal_code_regex:String,
    languages:Array,
    country_id:String,
    cities:Array
});

export const  CountryModel=Db.model('countries',CountrySchema);