import { SpaceRepository, FindSpaceQuery } from 'repositories/space';
import { Space } from 'entities/space';

export class SpaceService {
    constructor(private spaceRepository: SpaceRepository) {}

    async createSpace(spaceToInsert: Partial<Space>): Promise<Space> {
        let space: Space = this.spaceRepository.create(spaceToInsert);
        space = await this.spaceRepository.insertSpace(space);

        return space;
    }

    async getSpace(spaceQuery: FindSpaceQuery): Promise<Space[]> {
        const spaces = await this.spaceRepository.findByQuery(spaceQuery);
        return spaces;
    }
}
