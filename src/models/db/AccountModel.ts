import {Db} from '../../utils/Db';
const Schema=Db.Schema;

const AccountSchema=new Schema({
    user:{
        name:
        {
            type:String,
            trim:true,
            required:true,
            minlenght:1,
            maxlenght:50
        },
        lastname:{
            type:String,
            trim:true,
            required:true,
            minlenght:1,
            maxlenght:50
        }
    },
    credentials:{
        username:{
            type:String,
            trim:true,
            required:true,
            minlenght:1,
        },
        password:{
            type:String,
            trim:true,
            required:true,
            minlenght:1,
        }
    }
});

export const AccountModel=Db.model('accounts',AccountSchema);