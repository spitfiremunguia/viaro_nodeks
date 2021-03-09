
import express from 'express';
import {AuthorizationHandler} from '../routes/auth.router';
import { CountryRepository } from '../repositories/country.repository';
import { CountrService } from '../services/country.service';
import { CountryController } from '../controllers/country.controller';
import { ErrorHandler } from '../utils/errorHandler';
import {check,validationResult,sanitize} from 'express-validator';
const authorizationHandler=new AuthorizationHandler();
const router=express.Router();
const errorHandler=new ErrorHandler();

router.use('/',(req,res)=>authorizationHandler.IsTokenValid(req,res));

router.get('/countries',(req,res)=>{

    // this will be automated at some point :)
    const db=req.app.get('db');
    const countryRepository=new CountryRepository();
    const countryService=new CountrService(countryRepository);
    const controller=new CountryController(countryService);
    controller.GetCountries('',false).then(result=>{
        res.statusCode=200;
        res.send(result);
    })
    .catch(err=>{
        errorHandler.ErrorHandler(err,req,res);
    });
});


router.get('/states/:countryCode',
sanitize('countryCode').trim(),
check('countryCode').isLength({min:1}).trim(),
(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty())
        return res.status(400).json({errors:errors.array()});
    // this will be automated at some point :)
    const countryRepository=new CountryRepository();
    const countryService=new CountrService(countryRepository);
    const controller=new CountryController(countryService);
    controller.GetCities(req.params.countryCode.toString()).then(result=>{
        res.statusCode=200;
        res.send(result);
    })
    .catch(err=>{
        errorHandler.ErrorHandler(err,req,res);
    });
});


export default router;