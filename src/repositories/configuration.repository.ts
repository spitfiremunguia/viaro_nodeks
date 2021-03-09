import {ConfigurationModel} from '../models/db/ConfigurationModel';
import {Configurations} from '../models/Configurations';


export class ConfigurationRepository {

    public async GetConfigurations() {

        const result = await ConfigurationModel.findOne({},{_id:0}).exec();
        if(!result)
            return null;
        const Configuration={
            FrecuenciasDePago:result.get('FrecuenciasDePago'),
            CustomAmounts:result.get('CustomAmounts')
        } as Configurations
        return Configuration;
    }
}