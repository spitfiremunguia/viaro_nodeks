import { Account } from '../models/Account';
// db models
import { AccountModel } from '../models/db/AccountModel';


export class AccountRepository {
    public async addAccount(account: Account) {

        try{
            const accountModel = new AccountModel({
                user: {
                    name: account.user.name,
                    lastname: account.user.lastname
                },
                credentials: {
                    username: account.credentials.username,
                    password: account.credentials.password
                }
            });
            const result= await accountModel.save();
            return result.id;
       }
       catch(err){
           console.log(`Error trying to save model at \'accounts\' collection: ${err}`);
       }
    }

    public async GetUser(id: string) {
        try {
            const accountModel = await AccountModel.findById(id, '_id user');
            // return mapped object to domain
            const result = {
                id: accountModel.get('_id'),
                user: {
                    name: accountModel.get('user.name'),
                    lastname: accountModel.get('user.lastname')
                }
            }
            return result;
        }
        catch (e) {
            console.log(`Error trying to retrieve model at \'accounts\' collection: ${e}`)
        }
    }

    public async GetUserCredentialsBy(username: string) {
        try {
            const accountModel = await AccountModel.findOne({ 'credentials.username': username }, '_id credentials').exec();
            if(!accountModel)
                return null;
            const result = {
                id: accountModel.get('_id'),
                credentials: {
                    username: accountModel.get('credentials.username'),
                    password: accountModel.get('credentials.password')
                }
            }
            return result;
        }
        catch (err) {
            console.log(`Error trying to retrieve model at \'accounts\' collection: ${err}`);
        }
    }

}