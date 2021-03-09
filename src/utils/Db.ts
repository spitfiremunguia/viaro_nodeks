import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PWD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false`,
{
    useNewUrlParser: true,
    useUnifiedTopology: true
},
_=>{
    console.log(`CONNECTION TO DB ${process.env.DB_NAME} ESTABLISHED!`);
});


export const Db= mongoose;