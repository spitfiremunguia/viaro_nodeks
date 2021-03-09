import {Db} from '../../utils/Db';
const Schema=Db.Schema;

const AgencySchema=new Schema({
    Name:{
        type:String,
        trim:true,
        required:true,
        minlenght:1,
        maxlenght:50
    },
    MinimumDonation:{
        type:Number,
        required:true,
    }
});
export const AgencyModel=Db.model('agencies',AgencySchema);
