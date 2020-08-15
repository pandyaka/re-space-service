import { Connection } from 'typeorm';
import { createTestConnection } from '../helpers/create-connection';
import { SpaceRepository } from 'repositories/space';
import { factories } from '../factories';
import { MallRepository } from 'repositories/mall';
import { Mall } from 'entities/mall';

describe('SpaceRepository', () => {
    let connection: Connection;
    let spaceRepository: SpaceRepository;
    let mallRepository: MallRepository;
    let mall: Mall;

    beforeAll(async () => {
        connection = await createTestConnection();
        await connection.dropDatabase();
        await connection.runMigrations();
        spaceRepository = connection.getCustomRepository(SpaceRepository);
        mallRepository = connection.getCustomRepository(MallRepository);

        const mallToSave = factories.mall.build();
        mall = await mallRepository.insertMall(mallToSave);
    });

    afterAll(async () => {
        await connection.close();
    });

    // beforeEach(async () => {
    //     await spaceRepository.clear();
    // });

    describe('save()', () => {
        it('creates a rent in db', async () => {
            const spaceToSave = factories.space.build({
                mall: mall
            });
            const space = await spaceRepository.insertSpace(spaceToSave);

            expect(space.id).toBeString();
            const spaceInDB = await spaceRepository.findOne(space.id);
            expect(spaceInDB.id).toEqual(space.id);
            expect(spaceInDB.name).toEqual(space.name);
            expect(spaceInDB.size).toEqual(space.size);
            expect(spaceInDB.shape).toEqual(space.shape);
            expect(spaceInDB.allowed_tenant_type).toEqual(space.allowed_tenant_type);
        });
    });
});
