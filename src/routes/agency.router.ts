
import express from 'express';
import {AuthorizationHandler} from '../routes/auth.router';
import { AgencyRepository } from '../repositories/agency.repository';
import { AgencyController } from '../controllers/agency.controller';
import { AgencyService } from '../services/agency.service';
const authorizationHandler=new AuthorizationHandler();
const router=express.Router();

router.use('/',(req,res)=>authorizationHandler.IsTokenValid(req,res));

router.get('/',(req,res)=>{

    // this will be automated at some point :)
    const db=req.app.get('db');
    const agencyRepository=new AgencyRepository(db);
    const agencyService=new AgencyService(agencyRepository);
    const controller=new AgencyController(agencyService);
    controller.GetAgencies().then(result=>{
        res.statusCode=200;
        res.send(result);
    })
    .catch(err=>{
        res.statusCode=400;
        res.send(err);
    });
});


export default router;