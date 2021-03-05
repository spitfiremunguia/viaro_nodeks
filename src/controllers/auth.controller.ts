import {AuthService} from '../services/auth.service';

export class AuthController{
    private authService:AuthService;
    constructor(authService:AuthService){
        this.authService=authService;
    }

    public async ValidateToken(token:string)
    {
        // this should encrypt request
        try{
            const result= this.authService.tokenValid(token);
            return result;
        }
        catch(e){
            console.log(`ERROR AT CONTROLLER: ${e}`);
        }


    }

}