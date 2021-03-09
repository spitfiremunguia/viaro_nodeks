import jsonwebtoken from 'jsonwebtoken';
import {Credentials} from '../models/Credentials'
import {AuthRepository} from '../repositories/auth.repository';
import * as dotenv from 'dotenv';
dotenv.config();

// Sign token
export class AuthService
{
    private authRepository:AuthRepository;
    constructor(authRepository:AuthRepository)
    {
        this.authRepository=authRepository;
    }
    public  createAuthToken(accountid:string):string{
        // uses HMAC SHA256 as default encryption algorithm
        const token=jsonwebtoken.sign({accountid},process.env.JWT_SECRET,{expiresIn:'1h'});
        return token;
    }

    public tokenValid(token:string):boolean{

        try{
            jsonwebtoken.verify(token,process.env.JWT_SECRET);
            return true;
        }
        catch{
            return false;
        }

    }

    public async verifyCredentials(credentials:Credentials)
    {
        try{
            const result=await this.authRepository.VerifyCredentials(credentials);
            // result is an array
            if(result){
                // create token
                const newToken=this.createAuthToken(result.Id);
                return {
                    accountid:result.Id,
                    token:newToken
                }
            }
            return null;

        }
        catch(e){
            console.log(`ERROR AT SERVICE: ${e}`);
        }


    }
}
