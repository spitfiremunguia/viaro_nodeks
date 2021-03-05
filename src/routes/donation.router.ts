import express from 'express';
import {AccountService} from '../services/account.service';
import {DonationService} from '../services/donation.service';
import {AgencyRepository} from '../repositories/agency.repository';
import {AgencyService} from '../services/agency.service';
import {AccountRepository} from '../repositories/account.repository';
import {AuthorizationHandler} from '../routes/auth.router';
import {Donation} from '../models/Donation';
import { DonationController } from '../controllers/donation.controller';
import { DonationRepository } from '../repositories/donation.repository';
import {ErrorHandler} from '../utils/errorHandler';
const authorizationHandler=new AuthorizationHandler();
const errorHandler=new ErrorHandler();
const router=express.Router();


router.use('/',(req,res)=>authorizationHandler.IsTokenValid(req,res));

router.post('/saveDonation',(req,res,next)=>{

    // this will be automated at some point :)
    const db=req.app.get('db');
    const accountRepository=new AccountRepository(db);
    const donationRepository=new DonationRepository(db)
    const agencyRepository=new AgencyRepository(db);
    const accountService=new AccountService(accountRepository);
    const donationService=new DonationService(donationRepository,agencyRepository);
    const agencyService=new AgencyService(agencyRepository);
    const controller=new DonationController(donationService,accountService,agencyService);
    controller.CreateDonation(req.body as Donation).then(result=>{
        res.statusCode=201;
        res.send(result);
    })
    .catch(err=>{
        next(errorHandler.ErrorHandler(err,req,res));
    });
});


router.get('/getDonations',(req,res,next)=>{

    // this will be automated at some point :)
    const db=req.app.get('db');
    const accountRepository=new AccountRepository(db);
    const donationRepository=new DonationRepository(db)
    const agencyRepository=new AgencyRepository(db);
    const accountService=new AccountService(accountRepository);
    const donationService=new DonationService(donationRepository,agencyRepository);
    const agencyService=new AgencyService(agencyRepository);
    const controller=new DonationController(donationService,accountService,agencyService);
    controller.GetDonationsByUserId(req.query.userid.toString()).then(result=>{
        res.statusCode=200;
        res.send(result);
    })
    .catch(err=>{
        next(errorHandler.ErrorHandler(err,req,res));
    });
});
// Handle errors


export default router;