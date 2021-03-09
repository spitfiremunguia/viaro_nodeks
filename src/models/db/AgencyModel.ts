import {Db} from '../../utils/Db';
const Schema=Db.Schema;

const AgencySchema=new Schema({
    Name:String,
    MinimumDonation:Number
});
export const AgencyModel=Db.model('agencies',AgencySchema);
