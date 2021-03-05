import {DonationService} from '../services/donation.service';
import {AccountService} from '../services/account.service';
import {AgencyService} from '../services/agency.service';
import {Donation} from '../models/Donation';
import * as dotenv from 'dotenv';
import { CustomError } from '../models/CustomError';
const dateRegex=/^[0-9]{2}[\/][0-9]{2}[\/][0-9]{4}$/;
const creditCardRegex=/^(?:4[0-9]{12}(?:[0-9]{3})?|(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12}|(?:2131|1800|35\d{3})\d{11})$/;
const objectidRegex=/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;
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
        if(!dateRegex.test(donation.Date)){
            throw new CustomError(400,"INVALID DATE");
        }
        if(!creditCardRegex.test(donation.CardNumber)){
            throw new CustomError(400,"INVALID CARD NUMBER");
        }
        if(!objectidRegex.test(donation.UserId)){
            throw new CustomError(400,"INVALID USER ID");
        }
        if(!objectidRegex.test(donation.AgencyId)){
            throw new CustomError(400,"INVALID AGENCY ID");
        }
        if(!this.isNumber(donation.Amount))
        {
            throw new CustomError(400,"INVALID AMOUNT");
        }
        if(!donation.CVV)
        {
            throw new CustomError(400,"INVALID CVV");
        }
        const userId=donation.UserId;
        const userdata=await this.accountService.GetUser(userId);
        if(!userdata)
            throw new CustomError(404,"USER NOT FOUND");
        const agency=await this.agencyService.GetAgenciesById(donation.AgencyId);
        if(!agency)
            throw new CustomError(404,"AGENCY NOT FOUND");
        if(donation.Amount<agency.MinumumDonation)
            throw new CustomError(400,"AMOUNT MUST BE GREATER OR EQUAL THAN AGENCY MINIMUM AMOUNT");
        // validate other stuff
        const donationid=await this.donationService.CreateDonation(donation);
        return donationid;
    }

    public async GetDonationsByUserId(userid:string){

        if(!objectidRegex.test(userid))
            throw new CustomError(400,"INVALID USER ID");
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