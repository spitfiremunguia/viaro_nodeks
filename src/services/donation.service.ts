import {Donation} from '../models/Donation';
import {DonationRepository}from '../repositories/donation.repository';
import {AgencyRepository} from '../repositories/agency.repository';
import { CustomError } from '../models/CustomError';


export class DonationService{

    private donationRepisitory:DonationRepository;
    private agencyRepository:AgencyRepository;
    constructor(donationRepository:DonationRepository,agencyRepository:AgencyRepository)
    {
        this.donationRepisitory=donationRepository;
        this.agencyRepository=agencyRepository;
    }


    public async CreateDonation(donation:Donation)
    {
        try{

            const insertedId=await this.donationRepisitory.addDonation(donation);
            return insertedId;
        }
        catch(e){
            throw new CustomError(400,e.message);
        }
    }


    public async GetDonationByUserId(userid:string)
    {
        try{
            const result=await this.donationRepisitory.getDonationsByUserId(userid);
            if(result&&result.length>0){
                const donations=[];
                for(const x  of result){
                    const agency=await this.agencyRepository.GetAgenciesById(x.AgencyId);
                    donations.push( {
                        Date:x.Date,
                        Amount:x.Amount,
                        AgencyName:agency.Name,
                        Frequency:x.Frequency,
                        Country:x.Country,
                        Email:x.Email
                    });
                }
                return donations;
            }
            return [];
        }
        catch(e){
            throw Error(e);
        }
    }

}

