import express from "express";
import bodyParser from 'body-parser';
import * as dotenv from "dotenv";
import * as accountRouter from './routes/account.router';
import * as loginRouter from './routes/login.router';
import * as donationRouter from './routes/donation.router';
import * as agencyRouter from './routes/agency.router';
import * as countryRouter from './routes/country.router';
import * as configurationRouter from './routes/configuration.router';
import * as swaggerRouter from './routes/swagger/swagger.router';
import cron from 'cron';
import { DonationModel } from "./models/db/DonationModel";


dotenv.config();
const app = express();
app.listen(process.env.APP_PORT, () => {
    console.log(`SERVER RUNNING AT PORT:${process.env.APP_PORT}`);
    // start jobs
    const donationCron = new cron.CronJob("* * * */2 * *", async () => {

        const donation = new DonationModel({
            Frequency: 1,
            Amount: 1000,
            CardType: "VISA",
            CardNumber: "4012888888881881",
            CVV: "123",
            NameCard: "David Munguia",
            ExpirationDate: "01/23",
            Email: "damunguia@protonmail.com",
            Country: "GT",
            Address1: "some random address",
            Address2: "some random address",
            City: "Quiche",
            State: "Quiche",
            ZipCode: "01064",
            AgencyId: "6047f398cf1444456496f106",
            Date: "01-01-2020",
            UserId: "6047f398cf1444456496f106"

        });
        const result = await donation.save();
        console.log(`Donation saved: ${result.id}`);

    });
    donationCron.start();
});


app.use(bodyParser.json())
app.use('/account', accountRouter.default);
app.use('/login', loginRouter.default);
app.use('/donation', donationRouter.default);
app.use('/agencies', agencyRouter.default);
app.use('/country', countryRouter.default);
app.use('/configurations', configurationRouter.default);
app.use('/swagger', swaggerRouter.default);
