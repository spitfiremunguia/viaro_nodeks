import {DonationService} from '../services/donation.service';
import {AccountService} from '../services/account.service';
import {AgencyService} from '../services/agency.service';
import {Donation} from '../models/Donation';
import * as dotenv from 'dotenv';
import { CustomError } from '../models/CustomError';
dotenv.config();

export class DonationController{

    private donationService:DonationService;
    private accountService:AccountService;
    private agencyService:AgencyService;
    constructor(donationService:DonationService,accountService:AccountService,agencyService:AgencyService)
    {
        this.donationService=donationService;
        this.accountService=accountService;
        this.agencyService=agencyService;
    }

    public async CreateDonation(donation:Donation){

        // validate user existence
        const userId=donation.UserId;
        const userdata=await this.accountService.GetUser(userId);
        if(!userdata)
            throw new CustomError(404,"USER NOT FOUND");
        const agency=await this.agencyService.GetAgenciesById(donation.AgencyId);
        if(!agency)
            throw new CustomError(404,"AGENCY NOT FOUND");
        if(donation.Amount<agency.MinimumDonation)
            throw new CustomError(400,"AMOUNT MUST BE GREATER OR EQUAL THAN AGENCY MINIMUM AMOUNT");
        // validate other stuff
        const donationid=await this.donationService.CreateDonation(donation);
        return donationid;
    }

    public async GetDonationsByUserId(userid:string){
        // validate user existence
        const userdata=await this.accountService.GetUser(userid);
        if(!userdata)
            throw new CustomError(404,"USER NOT FOUND");
        // validate other stuff
        const donationid=await this.donationService.GetDonationByUserId(userid);
        return donationid;
    }

    private isNumber(value: string | number): boolean
            {
            return ((value != null) &&
                    (value !== '') &&
                    !isNaN(Number(value.toString())));
            }
}