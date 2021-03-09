import {Db} from '../../utils/Db';
const Schema=Db.Schema;

const CitySchema=new Schema({
    city_id:Number,
    name:String,
    ascii_name:String,
    alternate_names:Array,
    country_code:String,
    timezone:String,
    country:Object
});

export const CityModel=Db.model('cities',CitySchema);
