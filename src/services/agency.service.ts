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
            return result;
        }
        catch(e){
            console.log(`ERROR AT SERVICE: ${e}`);
        }
    }
}