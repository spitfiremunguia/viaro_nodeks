import express from 'express';
import {AccountService} from '../services/account.service';
import {AuthService} from '../services/auth.service';
import {AccountRepository} from '../repositories/account.repository';
import { AccountController } from '../controllers/account.controller';
import { AuthRepository } from '../repositories/auth.repository';
import {AuthorizationHandler} from '../routes/auth.router';
import {Account} from '../models/Account';
import { ErrorHandler } from '../utils/errorHandler';
const errorHandler=new ErrorHandler();
const authorizationHandler=new AuthorizationHandler();
const router=express.Router();


router.use('/user',(req,res)=>authorizationHandler.IsTokenValid(req,res));

router.post('/',(req,res)=>{

    // this will be automated at some point :)
    const db=req.app.get('db');
    const accountRepository=new AccountRepository(db);
    const authRepository=new AuthRepository(db)
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

router.get('/user',(req,res)=>{
    // this will be automated at some point :)
    const db=req.app.get('db');
    const accountRepository=new AccountRepository(db);
    const authRepository=new AuthRepository(db)
    const accountService=new AccountService(accountRepository);
    const authServie=new AuthService(authRepository);
    const controller=new AccountController(accountService,authServie);
    controller.GetUser(req.query.userid.toString()).then(result=>{
        res.statusCode=200;
        res.send(result);
    })
    .catch(err=>{
        errorHandler.ErrorHandler(err,req,res);
    });
});

export default router;