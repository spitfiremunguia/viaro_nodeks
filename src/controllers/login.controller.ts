import { AuthService } from '../services/auth.service';
import { Credentials } from '../models/Credentials';
import { CustomError } from '../models/CustomError';

export class LoginController {
    private authService: AuthService;
    constructor(authService: AuthService) {
        this.authService = authService;
    }

    public async VerifyCredentials(credentials: Credentials) {
        // this should encrypt request

        if(!credentials.username)
            throw new CustomError(400,'INVALID USERNAME');
        if(!credentials.password)
                throw new CustomError(400,'INVALID PASSWORD');
        const result = await this.authService.verifyCredentials(credentials);
        if(!result)
            throw new CustomError(404,'CREDENTIALS DON\'T MATCH ANY SAVED ACCOUNT');
        return result;
    }
}