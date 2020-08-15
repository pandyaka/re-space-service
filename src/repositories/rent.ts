import { EntityRepository, Repository } from 'typeorm';
import { Rent } from '../entities/rent';

export type FindRentQuery = {
    spaceId?: string;
    userId?: string;
    price?: number;
    interval?: number;
    next_payment?: Date;
};

@EntityRepository(Rent)
export class RentRepository extends Repository<Rent> {
    public async insertRent(rentToInsert: Rent): Promise<Rent> {
        const rent = await this.save(rentToInsert);
        return rent;
    }

    public async findByQuery(rentQuery: FindRentQuery): Promise<Rent[]> {
        const qb = this.createQueryBuilder('rent');

        if (rentQuery.spaceId) qb.andWhere('rent.spaceId = :spaceId', { spaceId: rentQuery.spaceId });
        if (rentQuery.userId) qb.andWhere('rent.userId = :userId', { userId: rentQuery.userId });
        if (rentQuery.price) qb.andWhere('rent.price = :price', { price: rentQuery.price });
        if (rentQuery.interval) qb.andWhere('rent.interval = :interval', { interval: rentQuery.interval });
        if (rentQuery.next_payment)
            qb.andWhere('rent.next_payment = :next_payment', { next_payment: rentQuery.next_payment });

        const rents = qb.getMany();
        return rents;
    }
}
