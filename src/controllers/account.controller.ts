import { Account } from '../models/Account';
import {AccountService} from '../services/account.service';
import {AuthService}from '../services/auth.service';
import {CustomError} from '../models/CustomError';
const objectidRegex=/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;


export class AccountController
{
    private accountService:AccountService;
    private authService:AuthService;
    constructor(accountService:AccountService,authService:AuthService)
    {
        this.accountService=accountService;
        this.authService=authService;
    }

    public async GetUser(id:string)
    {
        // validate userid
        if(!objectidRegex.test(id))
            throw new CustomError(400,'INVALID USER ID');
        const user=await this.accountService.GetUser(id);
        if(!user)
            throw new CustomError(404,'USER NOT FOUND');
        return user;

    }
    public async CreateAccount(account:Account)
    {

        if(!account.credentials.username)
            throw new CustomError(400,'INVALID USERNAME');
        if(!account.credentials.password)
            throw new CustomError   (400,'INVALID PASSWORD');
        if(!account.user.name)
            throw new CustomError   (400,'INVALID NAME');
        if(!account.user.lastname)
            throw new CustomError   (400,'INVALID LASTNAME');
        const usernameExists=await this.accountService.UsernameExists(account.credentials.username);
        if(usernameExists)
        {
            throw new CustomError   (400,'USERNAME NOT AVAILABLE');
        }
        // need to encryp account credentials first
        const id=await this.accountService.CreateAccount(account);
        // create token
        const newToken=this.authService.createAuthToken(id);
        const result={
            accountid:id,
            token:newToken
        }

        return result;

    }



}




