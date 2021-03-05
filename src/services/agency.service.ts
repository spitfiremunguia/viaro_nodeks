import { Agency } from '../models/Agency';
import {AgencyRepository} from '../repositories/agency.repository';

export class AgencyService{
    private agencyRepository:AgencyRepository;
    constructor(agencyRepository:AgencyRepository)
    {
        this.agencyRepository=agencyRepository;
    }

    public async GetAgencies(){

        try{
            const agencies=await this.agencyRepository.GetAgencies();
            return agencies;
        }
        catch(e){
            console.log(`ERROR AT SERVICE: ${e}`);
        }
    }
    public async GetAgenciesById(id:string){

        try{
            const result=await this.agencyRepository.GetAgenciesById(id);
            if(result)
                return result[0] as Agency;
            return null;
        }
        catch(e){
            console.log(`ERROR AT SERVICE: ${e}`);
        }
    }
}