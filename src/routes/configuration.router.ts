
import express from 'express';
import {AuthorizationHandler} from '../routes/auth.router';
import { ConfigurationRepository } from '../repositories/configuration.repository';
import { ConfigurationService } from '../services/configuration.service';
import { ConfigurationController } from '../controllers/configurations.controller';
import { ErrorHandler } from '../utils/errorHandler';
const errorHandler=new ErrorHandler();
const authorizationHandler=new AuthorizationHandler();
const router=express.Router();

router.use('/',(req,res)=>authorizationHandler.IsTokenValid(req,res));

router.get('/',(req,res)=>{

    // this will be automated at some point :)
    const configurationRepository=new ConfigurationRepository();
    const configurationService=new ConfigurationService(configurationRepository);
    const controller=new ConfigurationController(configurationService);
    controller.GetConfigurations().then(result=>{
        res.statusCode=200;
        res.send(result);
    })
    .catch(err=>{
        errorHandler.ErrorHandler(err,req,res);
    });
});





export default router;