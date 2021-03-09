import { Credentials } from '../models/Credentials';
import { AccountModel } from '../models/db/AccountModel';


export class AuthRepository{

    public async VerifyCredentials(credentials:Credentials){

        try{
            const query={ 'credentials.username':credentials.username,'credentials.password':credentials.password};
            const result=await AccountModel.findOne(query,'_id credentials').exec();
            // console.log(result);
            if(result)
                return {
                    Id:result.get('_id'),
                    username:result.get('credentials.username'),
                    password:result.get('credentials.password')
                };
            return null;
        }
        catch(e){
            throw Error(`Error trying to retrieve model at \'accounts\' collection: ${e}`);
        }
    }
}