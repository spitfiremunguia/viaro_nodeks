import {Configurations} from '../models/Configurations';
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
            if(result&&result.length>0){

                return result[0] as Configurations;
            }
            return null;
        }
        catch(e){
            console.log(`ERROR AT SERVICE: ${e}`);
        }
    }
}