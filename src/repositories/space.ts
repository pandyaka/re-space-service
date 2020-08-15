import { EntityRepository, Repository } from 'typeorm';
import { Space, SpaceAllowedTenantType, SpaceShapeType } from '../entities/space';

export type FindSpaceQuery = {
    name?: string;
    size?: number;
    shape?: SpaceShapeType;
    price?: number;
    allowed_tenant_type?: SpaceAllowedTenantType;
    mallId?: string;
};

@EntityRepository(Space)
export class SpaceRepository extends Repository<Space> {
    public async insertSpace(spaceToInsert: Space): Promise<Space> {
        const space = await this.save(spaceToInsert);
        return space;
    }

    public async findByQuery(spaceQuery: FindSpaceQuery): Promise<Space[]> {
        const qb = this.createQueryBuilder('space');

        if (spaceQuery.name) qb.andWhere('space.name = :name', { name: spaceQuery.name });
        if (spaceQuery.size) qb.andWhere('space.size = :size', { size: spaceQuery.size });
        if (spaceQuery.price) qb.andWhere('space.price = :price', { price: spaceQuery.price });
        if (spaceQuery.shape) qb.andWhere('space.shape = :shape', { shape: spaceQuery.shape });
        if (spaceQuery.allowed_tenant_type)
            qb.andWhere('space.allowed_tenant_type = :allowed_tenant_type', {
                allowed_tenant_type: spaceQuery.allowed_tenant_type
            });
        if (spaceQuery.mallId) qb.andWhere('space.mallId = :mallId', { mallId: spaceQuery.mallId });

        const spaces = qb.getMany();
        return spaces;
    }
}
