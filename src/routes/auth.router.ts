import {AuthService} from '../services/auth.service';
import {AuthRepository} from '../repositories/auth.repository';
import { AuthController } from '../controllers/auth.controller';
import { Request,Response} from 'express';
import { ErrorHandler } from '../utils/errorHandler';
import { CustomError } from '../models/CustomError';
const errorHandler=new ErrorHandler();
export class AuthorizationHandler{

    public IsTokenValid=(req:Request,res:Response)=>{

        // this will be automated at some point :)
        const authRepository=new AuthRepository(req.app.get('db'));
        const authService=new AuthService(authRepository);
        const controller=new AuthController(authService);

        const bearerHeader = req.headers.authorization;
        try{
            if(!bearerHeader){
                throw new CustomError(401,'INVALID OR EXPIRED AUTHORIZATION TOKEN');
            }
        }
        catch(err){
            errorHandler.ErrorHandler(err,req,res);
        }

        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        controller.ValidateToken(bearerToken).then(result=>{

            if(result){
                res.statusCode=200;
                req.next();
            }
            else{
                throw new CustomError(401,'INVALID OR EXPIRED AUTHORIZATION TOKEN');
            }

        })
        .catch(err=>{
           errorHandler.ErrorHandler(err,req,res);
        });
    };

}