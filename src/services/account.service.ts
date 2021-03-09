import {User}  from '../models/User';
import {Account} from '../models/Account';
import {AccountRepository}from '../repositories/account.repository';
import { Credentials } from '../models/Credentials';

export class AccountService{

    private accountRepository:AccountRepository;
    constructor(userRepository:AccountRepository)
    {
        this.accountRepository=userRepository;
    }

    public async CreateAccount(account:Account)
    {
        try{
            account.credentials.username="";
            account.credentials.password="";
            const insertedId=await this.accountRepository.addAccount(account);
            return insertedId;
        }
        catch(e){
            throw Error(e);
        }

    }

    public async GetUser(id:string){
        try{
            const result=await this.accountRepository.GetUser(id);

            if(result){
                // create token
                const accountid=result.id;
                const user={name:result.user.name,lastname:result.user.lastname} as User;
                return {
                    accountid,
                    user
                }
            }
            return null;
        }
        catch(e){
            throw Error(e);
        }
    }

    public async UsernameExists(username:string){
        try{
            const result=await this.accountRepository.GetUserCredentialsBy(username);
            if(result){
                // create token
                const credentials=result.credentials as Credentials;
                const exists=credentials.username===username;
                return exists;
            }
            return false;
        }
        catch(e){
            throw Error(e);
        }
    }
}