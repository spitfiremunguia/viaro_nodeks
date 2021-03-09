import {AgencyModel} from '../models/db/AgencyModel';
import {Agency} from '../models/Agency';

export class AgencyRepository
{

    public async GetAgencies()
    {
        try{
            const agencies=await AgencyModel.find();
            const result=[];
            for(const agencyModel of agencies){
                const agency={
                    Id:agencyModel.get('_id'),
                    Name:agencyModel.get('Name'),
                    MinimumDonation:agencyModel.get('MinimumDonation')
                } as Agency;
                result.push(agency);
            }
            return result;
        }
        catch(err){
            throw Error(`Error trying to retrieve models at \'agency\' collection: ${err}`);
        }

    }
    public async GetAgenciesById(id:string)
    {
        try{
            const agencyModel=await AgencyModel.findById(id).exec();
            if(!agencyModel)
                return null;
            const agency={
                Id:agencyModel.get('_id'),
                Name:agencyModel.get('Name'),
                MinimumDonation:agencyModel.get('MinimumDonation')
            } as Agency;
            return agency;
        }
        catch(err){
            throw Error(`Error trying to retrieve model at \'agency\' collection: ${err}`);
        }

    }
}