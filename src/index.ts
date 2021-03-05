import express from "express";
import bodyParser from 'body-parser';
import * as dotenv from "dotenv";
import * as connectionManager from './utils/connectionManager';
import * as accountRouter from './routes/account.router';
import * as loginRouter from './routes/login.router';
import * as donationRouter from './routes/donation.router';
import * as agencyRouter from './routes/agency.router';
import * as countryRouter from './routes/country.router';
import * as configurationRouter from './routes/configuration.router';
import { Db } from "mongodb";
dotenv.config();
const app=express();
let db:Db;
const connectServices=async()=>{
    db=await connectionManager.getDb();
}



connectServices().then(()=>{
    app.listen(process.env.APP_PORT,()=>{
        app.set('db',db);
        console.log(`SERVER RUNNING AT PORT:${process.env.APP_PORT}`);
    });

})
.catch(err=>{
    console.log(`ERROR TRYING TO RUN SERVER: ${err}`);
});

app.use(bodyParser.json())
app.use('/account',accountRouter.default);
app.use('/login',loginRouter.default);
app.use('/donation',donationRouter.default);
app.use('/agencies',agencyRouter.default);
app.use('/country',countryRouter.default);
app.use('/configurations',configurationRouter.default);

