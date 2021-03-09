import express from "express";
import bodyParser from 'body-parser';
import * as dotenv from "dotenv";
import * as accountRouter from './routes/account.router';
import * as loginRouter from './routes/login.router';
import * as donationRouter from './routes/donation.router';
import * as agencyRouter from './routes/agency.router';
import * as countryRouter from './routes/country.router';
import * as configurationRouter from './routes/configuration.router';
dotenv.config();
const app=express();
app.listen(process.env.APP_PORT,()=>{
    console.log(`SERVER RUNNING AT PORT:${process.env.APP_PORT}`);
});
app.use(bodyParser.json())
app.use('/account',accountRouter.default);
app.use('/login',loginRouter.default);
app.use('/donation',donationRouter.default);
app.use('/agencies',agencyRouter.default);
app.use('/country',countryRouter.default);
app.use('/configurations',configurationRouter.default);

