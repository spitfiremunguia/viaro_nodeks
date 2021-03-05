import express from 'express';
import {AuthService} from '../services/auth.service';
import {AuthRepository} from '../repositories/auth.repository';
import { LoginController } from '../controllers/login.controller';
import {Credentials} from '../models/Credentials';
import { ErrorHandler } from '../utils/errorHandler';
import { body, validationResult } from 'express-validator';
const errorHandler=new ErrorHandler();

const router=express.Router();



router.post('/',
body('credentials.username').isEmail(),
body('credentials.password').isLength({min:6}),
(req,res)=>{

    // this will be automated at some point :)
    const errors=validationResult(req);
    if(!errors.isEmpty())
        return res.status(400).json({errors:errors.array()});
    const authRepository=new AuthRepository(req.app.get('db'));
    const authService=new AuthService(authRepository);
    const controller=new LoginController(authService);
    controller.VerifyCredentials(req.body.credentials as Credentials).then(result=>{
        res.statusCode=200;
        res.send(result);
    })
    .catch(err=>{
        errorHandler.ErrorHandler(err,req,res);
    });
});

export default router;