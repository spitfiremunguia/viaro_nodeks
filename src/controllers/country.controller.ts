import { CustomError } from '../models/CustomError';
import {CountrService} from '../services/country.service';

export class CountryController
{
    private countryService:CountrService;
    constructor(countryServicer:CountrService)
    {
        this.countryService=countryServicer;
    }
    public async GetCountries(countryCode:string,getCities:boolean)
    {
        if(countryCode==null)
            throw new CustomError(400,'INVALID COUNTRY CODE');
        const result=this.countryService.GetCountries(countryCode,getCities);
        return result;
    }

    public async GetCities(countryCode:string)
    {
        if(countryCode==null)
            throw new CustomError(400,'INVALID COUNTRY CODE');
        console.log(countryCode);
        const currentCountry=await this.countryService.GetCountries(countryCode,false);
        if(!currentCountry||currentCountry.length===0)
            throw new CustomError(404,'COUNTRY NOT FOUND');
        const result=this.countryService.GetCities(countryCode);
        return result;
    }
}