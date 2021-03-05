import {AgencyService} from '../services/agency.service';

export class AgencyController{
    private agencyService:AgencyService;
    constructor(agencyService:AgencyService){
        this.agencyService=agencyService;
    }
    public async GetAgencies()
    {
        try{
            const result=await this.agencyService.GetAgencies();
            return result;
        }
        catch(e){
            console.log(`ERROR AT CONTROLLER: ${e}`);
        }
    }
}