import { Donation } from '../models/Donation';
import { DonationRepository } from '../repositories/donation.repository';
import { AgencyRepository } from '../repositories/agency.repository';
import { CustomError } from '../models/CustomError';
import Exceljs, { Workbook } from 'exceljs';


export class DonationService {

    private donationRepisitory: DonationRepository;
    private agencyRepository: AgencyRepository;
    constructor(donationRepository: DonationRepository, agencyRepository: AgencyRepository) {
        this.donationRepisitory = donationRepository;
        this.agencyRepository = agencyRepository;
    }

    public async CreateDonationWorksheet(userid: string) {
        // define  worksheet structure
        const structure = [
            { header: 'Donation Date', key: 'Date', width: 30 },
            { header: 'Amount donated', key: 'Amount', width: 30 },
            { header: 'Agency Name', key: 'AgencyName', width: 30 },
            { header: 'Frequency', key: 'Frequency', width: 30 },
            { header: 'Country', key: 'Country', width: 30 },
            { header: 'Donor\'s Email', key: 'Email', width: 30 }
        ];

        const workBook = new Exceljs.Workbook();
        const workSheet = workBook.addWorksheet('User donations');
        workSheet.columns = structure;
        // get all donations for an userId
        const userDonations = await this.GetUserDonations(userid);

        userDonations.forEach((donation) => {
            workSheet.addRow({
                Date:donation.Date,
                Amount:donation.Amount,
                AgencyName:donation.AgencyName,
                Frequency:donation.Frequency,
                Country:donation.Country,
                Email:donation.Email
            });
        });

        return workBook;

    }


    public async CreateDonation(donation: Donation) {
        try {

            const insertedId = await this.donationRepisitory.addDonation(donation);
            return insertedId;
        }
        catch (e) {
            throw new CustomError(400, e.message);
        }
    }


    public async GetDonationByUserId(userid: string) {
        try {
            return await this.GetUserDonations(userid);
        }
        catch (e) {
            throw Error(e);
        }
    }

    private async GetUserDonations(userid: string) {
        const result = await this.donationRepisitory.getDonationsByUserId(userid);
        if (result && result.length > 0) {
            const donations = [];
            for (const x of result) {
                const agency = await this.agencyRepository.GetAgenciesById(x.AgencyId);
                donations.push({
                    Date: x.Date,
                    Amount: x.Amount,
                    AgencyName: agency.Name,
                    Frequency: x.Frequency,
                    Country: x.Country,
                    Email: x.Email
                });
            }
            return donations;
        }
        return [];
    }

}

