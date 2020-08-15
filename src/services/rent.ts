import { RentRepository, FindRentQuery } from 'repositories/rent';
import { Rent } from 'entities/rent';

export class RentService {
    constructor(private rentRepository: RentRepository) {}

    async createRent(rentToInsert: Partial<Rent>): Promise<Rent> {
        let rent: Rent = this.rentRepository.create(rentToInsert);
        rent = await this.rentRepository.insertRent(rent);

        return rent;
    }

    async getRent(rentQuery: FindRentQuery): Promise<Rent[]> {
        const rents = await this.rentRepository.findByQuery(rentQuery);
        return rents;
    }
}
