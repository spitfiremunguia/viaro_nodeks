import express from 'express';
import {AccountService} from '../services/account.service';
import {AuthService} from '../services/auth.service';
import {AccountRepository} from '../repositories/account.repository';
import { AccountController } from '../controllers/account.controller';
import { AuthRepository } from '../repositories/auth.repository';
import {AuthorizationHandler} from '../routes/auth.router';
import {Account} from '../models/Account';
import { ErrorHandler } from '../utils/errorHandler';
import { body, validationResult,checkSchema,check } from 'express-validator';
const errorHandler=new ErrorHandler();
const authorizationHandler=new AuthorizationHandler();
const router=express.Router();


router.use('/user',(req,res)=>authorizationHandler.IsTokenValid(req,res));

router.post('/',
body('user.name').notEmpty(),
body('user.lastname').notEmpty(),
body('credentials.username').isEmail(),
body('credentials.password').isLength({min:6})
,(req,res)=>{

    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    // this will be automated at some point :)
    const accountRepository=new AccountRepository();
    const authRepository=new AuthRepository()
    const accountService=new AccountService(accountRepository);
    const authServie=new AuthService(authRepository);
    const controller=new AccountController(accountService,authServie);

    controller.CreateAccount(req.body as Account).then(result=>{
        res.statusCode=201;
        res.send(result);
    })
    .catch(err=>{
        errorHandler.ErrorHandler(err,req,res);
    });
});


router.get('/user/:userid',
check('userid').isMongoId(),
(req:express.Request,res:express.Response)=>{

    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    // this will be automated at some point :)
    const accountRepository=new AccountRepository();
    const authRepository=new AuthRepository()
    const accountService=new AccountService(accountRepository);
    const authServie=new AuthService(authRepository);
    const controller=new AccountController(accountService,authServie);
    controller.GetUser(req.params.userid.toString()).then(result=>{
        res.statusCode=200;
        res.send(result);
    })
    .catch(err=>{
        errorHandler.ErrorHandler(err,req,res);
    });
});

export default router;