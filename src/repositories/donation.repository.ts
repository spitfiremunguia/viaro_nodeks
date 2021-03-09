import {DonationModel} from '../models/db/DonationModel';
import {Donation} from '../models/Donation';

export class DonationRepository{

    public async addDonation(donation:Donation){

        try{
            const donationModel=new DonationModel({
                Frequency:donation.Frequency,
                Amount:donation.Amount,
                CardType:donation.CardType,
                CardNumber:donation.CardType,
                CVV:donation.CVV,
                NameCard:donation.NameCard,
                ExpirationDate:donation.ExpirationDate,
                Email:donation.Email,
                Country:donation.Country,
                Address1:donation.Address1,
                Address2:donation.Address2,
                City:donation.City,
                State:donation.State,
                ZipCode:donation.ZipCode,
                AgencyId:donation.AgencyId,
                Date:donation.Date,
                UserId:donation.UserId
            });

            const result =await donationModel.save();
            return result.id;
        }
        catch(err){
            console.log(`Error trying to save model at \'donations\' collection: ${err}`);
        }
    }

    public async getDonationsByUserId(userId:string){

        try{

            const query={'UserId':userId};
            const projection={'Date':1,'Amount':1,'AgencyId':1,'Frequency':1,'Country':1,'Email':1,'_id':0};
            const result =await DonationModel.find(query,projection).exec();
            if(!result)
                return null;
            const donations=[];
            for(const donationModel of result){
                const donation={
                    Date:donationModel.get('Date'),
                    Amount:donationModel.get('Amount'),
                    AgencyId:donationModel.get('AgencyId'),
                    Frequency:donationModel.get('Frequency'),
                    Country:donationModel.get('Country'),
                    Email:donationModel.get('Email')
                };
                donations.push(donation);
            }
            return donations;
        }
        catch(err){
            console.log(`Error trying to retrieve model at \'donations\' collection: ${err}`);
        }
    }
}