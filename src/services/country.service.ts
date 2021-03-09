import { City } from '../models/City';
import {Country} from '../models/Country';
import {CountryRepository} from '../repositories/country.repository';


export class CountrService
{
    private countryRepository:CountryRepository;
    constructor (countryRepository:CountryRepository)
    {
        this.countryRepository=countryRepository;
    }
    public async GetCountries(countryCode:string,getCities:boolean)
    {
        try
        {
            const result=await this.countryRepository.GetCountries(countryCode,getCities);
            return result;
        }
        catch(e){
            console.log(`ERROR AT SERVICE: ${e}`);
        }
    }


    public async GetCities(countryCode:string)
    {
        try
        {
            const result=await this.countryRepository.GetCities(countryCode);
            return result;
        }
        catch(e){
            console.log(`ERROR AT SERVICE: ${e}`);
        }
    }
}