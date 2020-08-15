import { MallRepository, FindMallQuery } from 'repositories/mall';
import { Mall } from 'entities/mall';

export class MallService {
    constructor(private mallRepository: MallRepository) {}

    async createMall(mallToInsert: Partial<Mall>): Promise<Mall> {
        let mall: Mall = this.mallRepository.create(mallToInsert);
        mall = await this.mallRepository.insertMall(mall);

        return mall;
    }

    async getMall(mallQuery: FindMallQuery): Promise<Mall[]> {
        const malls = await this.mallRepository.findByQuery(mallQuery);
        return malls;
    }
}
