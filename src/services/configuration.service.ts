import {ConfigurationRepository} from '../repositories/configuration.repository';


export class ConfigurationService
{
    private configurationRepository:ConfigurationRepository;
    constructor (configurationRepository:ConfigurationRepository)
    {
        this.configurationRepository=configurationRepository;
    }
    public async GetConfigurations()
    {
        try
        {
            const result=await this.configurationRepository.GetConfigurations();
            return result;
        }
        catch(e){
            console.log(`ERROR AT SERVICE: ${e}`);
        }
    }
}