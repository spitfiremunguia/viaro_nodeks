import {Db} from '../../utils/Db';
const Schema=Db.Schema;

const AccountSchema=new Schema({
    user:{
        name:String,
        lastname:String
    },
    credentials:{
        username:String,
        password:String
    }
});

export const AccountModel=Db.model('accounts',AccountSchema);