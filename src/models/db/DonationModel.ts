import {Db} from '../../utils/Db';
const Schema=Db.Schema;

const DonationSchema=new Schema({
    Frequency:Number,
    Amount:Number,
    CardType:String,
    CardNumber:String,
    CVV:String,
    NameCard:String,
    ExpirationDate:String,
    Email:String,
    Country:String,
    Address1:String,
    Address2:String,
    City:String,
    State:String,
    ZipCode:String,
    AgencyId:String,
    Date,
    UserId:String
});

export const DonationModel=Db.model('donations',DonationSchema);