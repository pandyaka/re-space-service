import { SpaceRepository, FindSpaceQuery } from 'repositories/space';
import { Space } from 'entities/space';
import { Request } from 'express';
import { MallService } from './mall';

export class SpaceService {
    constructor(private spaceRepository: SpaceRepository, private mallService: MallService) {}

    async createSpace(spaceToInsert: FindSpaceQuery): Promise<Space> {
        const foundMall = await this.mallService.getMall({
            id: spaceToInsert.mall_id
        });

        if (foundMall.length === 1) {
            const spaceToCreate: Partial<Space> = {
                name: spaceToInsert.name,
                size: spaceToInsert.size,
                shape: spaceToInsert.shape,
                price: spaceToInsert.price,
                allowed_tenant_type: spaceToInsert.allowed_tenant_type,
                mall: foundMall[0]
            };
            let space: Space = this.spaceRepository.create(spaceToCreate);
            space = await this.spaceRepository.insertSpace(space);
            return space;
        }
        return null;
    }

    async getSpace(spaceQuery: FindSpaceQuery): Promise<Space[]> {
        const spaces = await this.spaceRepository.findByQuery(spaceQuery);
        return spaces;
    }

    async getSpaceById(spaceId: string): Promise<Space> {
        const space = await this.spaceRepository.findOne({
            id: spaceId
        });

        return space;
    }

    async getRentedSpace(): Promise<Space[]> {
        const spaces = await this.spaceRepository.findRentedSpace();

        return spaces;
    }
}
