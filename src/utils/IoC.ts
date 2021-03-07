// controllers
import {AccountController} from '../controllers/account.controller';
// services
import {AccountService} from '../services/account.service';
import {AuthService} from '../services/auth.service';
// repositories
import {AuthRepository} from '../repositories/auth.repository';
import {AccountRepository} from '../repositories/account.repository';

import awilix from 'awilix';

const createAppContainer=()=>{
    const container=awilix.createContainer();
    container.register({
        // Controllers
        accountController:awilix.asClass(AccountController),
        // Services
        accountService:awilix.asClass(AccountService),
        authService:awilix.asClass(AuthService),
        // Repositories
        accountRepository:awilix.asClass(AccountRepository),
        authRepository:awilix.asClass(AuthRepository)

    });
}

export class  IocManager {
    createContainer=createAppContainer
}