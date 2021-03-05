import {ConfigurationService} from '../services/configuration.service';

export class ConfigurationController
{
    private configurationService:ConfigurationService;
    constructor(configurationService:ConfigurationService)
    {
        this.configurationService=configurationService;
    }
    public async GetConfigurations()
    {
        try{
            const result=this.configurationService.GetConfigurations();
            return result;
        }
        catch(e){
            console.log(`ERROR AT CONTROLLER: ${e}`);
        }
    }
}