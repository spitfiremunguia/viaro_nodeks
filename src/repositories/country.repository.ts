import {CountryModel} from '../models/db/CountryModel';
import {CityModel} from '../models/db/CityModel';
import {Country} from '../models/Country';
import {City} from '../models/City';

export class CountryRepository {

    public async GetCountries(countryCode: string, getCities: boolean) {
        let query = {};
        if (countryCode != null && countryCode !== '') {
            query = { 'iso': countryCode };
        }
        const projection = {'cities': getCities?1:0}
        const result = await CountryModel.find(query,projection).exec();
        if(!result)
            return null
        const countries=[];
        for(const countryModel of result){
            const country={
                iso:countryModel.get('iso'),
                country:countryModel.get('country'),
                capital:countryModel.get('capital'),
                currency_code:countryModel.get('currency_code'),
                currency_name:countryModel.get('currency_name'),
                currency_symbol:countryModel.get('currency_symbol'),
                phone:countryModel.get('phone'),
                postal_code_format:countryModel.get('postal_code_format'),
                postal_code_regex:countryModel.get('postal_code_regex'),
                languages:countryModel.get('languages'),
                country_id:countryModel.get('country_id'),
                cities:countryModel.get('cities')
            } as Country;
            countries.push(country);
        }
        return countries;
    }

    public async GetCities(countryCode: string) {
        const query = { 'country_code': countryCode };
        const projection = {'country': 0}
        const result = await CityModel.find(query,projection).exec();
        if(!result)
            return null;
        const cities=[];
        for(const cityModel of result){
            const city={
                city_id:cityModel.get('city_id'),
                name:cityModel.get('name'),
                ascii_name:cityModel.get('name'),
                alternate_names:cityModel.get('alternate_names'),
                country_code:cityModel.get('country_code'),
                timezone:cityModel.get('timezone')
            } as City;
            cities.push(city);
        }
        return cities;
    }
}