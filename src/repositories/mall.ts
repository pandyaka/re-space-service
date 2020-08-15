import { EntityRepository, Repository } from 'typeorm';
import { Mall, MallClass } from '../entities/mall';

export type FindMallQuery = {
    id?: string;
    name?: string;
    class?: MallClass;
    location?: string;
    highlights?: string[];
};

@EntityRepository(Mall)
export class MallRepository extends Repository<Mall> {
    public async insertMall(mallToInsert: Mall): Promise<Mall> {
        const mall = await this.save(mallToInsert);
        return mall;
    }

    public async findByQuery(mallQuery: FindMallQuery): Promise<Mall[]> {
        const qb = this.createQueryBuilder('mall');

        if (mallQuery.id) qb.andWhere('mall.id = :id', { id: mallQuery.id });
        if (mallQuery.name) qb.andWhere('mall.name = :name', { name: mallQuery.name });
        if (mallQuery.class) qb.andWhere('mall.class = :class', { class: mallQuery.class });
        if (mallQuery.location) qb.andWhere('mall.location LIKE :location', { location: `%${mallQuery.location}%` });
        if (mallQuery.highlights)
            qb.andWhere('mall.highlights IN (:...highlights)', { highlights: mallQuery.highlights });

        const malls = qb.getMany();
        return malls;
    }
}
