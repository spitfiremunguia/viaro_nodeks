import cron from 'cron';
import { DonationModel } from "../models/db/DonationModel";
const donationCron = new cron.CronJob("0 0-59/1 * * * *", async () => {

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
        AgencyId: "60416c698ea7047966fd90dd",
        Date: "01-01-2020",
        UserId: "6047f398cf1444456496f106"

    });
    const result = await donation.save();
    console.log(`Donation saved: ${result.id}`);

});

export const StartJobs=()=>{
    donationCron.start();
};